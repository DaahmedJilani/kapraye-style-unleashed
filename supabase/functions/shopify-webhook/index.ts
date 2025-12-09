import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-shopify-topic, x-shopify-hmac-sha256, x-shopify-shop-domain',
}

interface ShopifyOrder {
  id: number
  order_number: number
  email: string
  total_price: string
  currency: string
  financial_status: string
  fulfillment_status: string | null
  created_at: string
  line_items: Array<{
    id: number
    title: string
    quantity: number
    price: string
    variant_id: number
    product_id: number
  }>
  customer: {
    id: number
    email: string
    first_name: string
    last_name: string
  } | null
  billing_address: {
    first_name: string
    last_name: string
    address1: string
    address2: string | null
    city: string
    province: string
    zip: string
    country: string
    phone: string | null
  } | null
  shipping_address: {
    first_name: string
    last_name: string
    address1: string
    address2: string | null
    city: string
    province: string
    zip: string
    country: string
    phone: string | null
  } | null
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const topic = req.headers.get('x-shopify-topic')
    const shopDomain = req.headers.get('x-shopify-shop-domain')
    
    console.log(`Received Shopify webhook: ${topic} from ${shopDomain}`)

    const body = await req.json() as ShopifyOrder

    // Handle different webhook topics
    switch (topic) {
      case 'orders/create':
      case 'orders/paid':
        await handleOrderCreated(supabase, body)
        break
      case 'orders/fulfilled':
        await handleOrderFulfilled(supabase, body)
        break
      case 'orders/cancelled':
        await handleOrderCancelled(supabase, body)
        break
      default:
        console.log(`Unhandled webhook topic: ${topic}`)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Webhook processing error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function sendEmailNotification(
  type: string,
  email: string,
  customerName: string,
  orderNumber: string,
  orderTotal: string,
  userId?: string,
  loyaltyPoints?: number
) {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const response = await fetch(`${supabaseUrl}/functions/v1/send-email-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
      },
      body: JSON.stringify({
        type,
        email,
        customerName,
        orderNumber,
        orderTotal,
        userId,
        loyaltyPoints,
      }),
    })
    
    if (!response.ok) {
      console.error('Failed to send email notification:', await response.text())
    } else {
      console.log(`Email notification sent: ${type} to ${email}`)
    }
  } catch (error) {
    console.error('Error sending email notification:', error)
  }
}

async function handleOrderCreated(supabase: any, order: ShopifyOrder) {
  console.log(`Processing order #${order.order_number}`)

  // Find user by email
  const { data: users } = await supabase.auth.admin.listUsers()
  const user = users?.users?.find((u: any) => u.email === order.email)
  
  if (!user) {
    console.log(`No user found for email: ${order.email}`)
  }

  const userId = user?.id
  const customerName = order.customer 
    ? `${order.customer.first_name} ${order.customer.last_name}` 
    : order.billing_address 
      ? `${order.billing_address.first_name} ${order.billing_address.last_name}`
      : 'Valued Customer'

  // Check if order already exists
  const { data: existingOrder } = await supabase
    .from('orders')
    .select('id')
    .eq('order_number', `SHOP-${order.order_number}`)
    .single()

  if (existingOrder) {
    console.log(`Order #${order.order_number} already exists, updating...`)
    
    // Update existing order
    await supabase
      .from('orders')
      .update({
        status: mapShopifyStatus(order.fulfillment_status),
        payment_status: order.financial_status,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingOrder.id)
    
    return
  }

  // Create order in database
  const orderData = {
    order_number: `SHOP-${order.order_number}`,
    user_id: userId || '00000000-0000-0000-0000-000000000000',
    status: mapShopifyStatus(order.fulfillment_status),
    payment_method: 'shopify',
    payment_status: order.financial_status,
    subtotal: parseFloat(order.total_price),
    total: parseFloat(order.total_price),
    billing_address: order.billing_address || {},
    shipping_address: order.shipping_address || {},
    transaction_id: `shopify-${order.id}`,
    created_at: order.created_at
  }

  const { data: newOrder, error: orderError } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single()

  if (orderError) {
    console.error('Failed to create order:', orderError)
    throw orderError
  }

  console.log(`Order created: ${newOrder.id}`)

  // Create order items
  const orderItems = order.line_items.map(item => ({
    order_id: newOrder.id,
    product_id: null,
    quantity: item.quantity,
    price: parseFloat(item.price),
    subtotal: parseFloat(item.price) * item.quantity,
    product_snapshot: {
      shopify_product_id: item.product_id,
      shopify_variant_id: item.variant_id,
      title: item.title,
      price: item.price
    }
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    console.error('Failed to create order items:', itemsError)
  }

  // Send order confirmation email
  await sendEmailNotification(
    'order_confirmed',
    order.email,
    customerName,
    `SHOP-${order.order_number}`,
    order.total_price,
    userId
  )

  // Award loyalty points if user exists and order is paid
  if (userId && order.financial_status === 'paid') {
    const points = await awardLoyaltyPoints(supabase, userId, order)
    
    // Send loyalty points notification
    if (points > 0) {
      await sendEmailNotification(
        'loyalty_points',
        order.email,
        customerName,
        `SHOP-${order.order_number}`,
        order.total_price,
        userId,
        points
      )
    }
  }
}

async function handleOrderFulfilled(supabase: any, order: ShopifyOrder) {
  console.log(`Order #${order.order_number} fulfilled`)

  const customerName = order.customer 
    ? `${order.customer.first_name} ${order.customer.last_name}` 
    : 'Valued Customer'

  // Update order status
  await supabase
    .from('orders')
    .update({ 
      status: 'fulfilled',
      updated_at: new Date().toISOString()
    })
    .eq('order_number', `SHOP-${order.order_number}`)

  // Find user for notification
  const { data: users } = await supabase.auth.admin.listUsers()
  const user = users?.users?.find((u: any) => u.email === order.email)

  // Send shipped/delivered email
  await sendEmailNotification(
    'order_delivered',
    order.email,
    customerName,
    `SHOP-${order.order_number}`,
    order.total_price,
    user?.id
  )
}

async function handleOrderCancelled(supabase: any, order: ShopifyOrder) {
  console.log(`Order #${order.order_number} cancelled`)

  const customerName = order.customer 
    ? `${order.customer.first_name} ${order.customer.last_name}` 
    : 'Valued Customer'

  // Update order status
  const { data: existingOrder } = await supabase
    .from('orders')
    .update({ 
      status: 'cancelled',
      updated_at: new Date().toISOString()
    })
    .eq('order_number', `SHOP-${order.order_number}`)
    .select()
    .single()

  // Find user
  const { data: users } = await supabase.auth.admin.listUsers()
  const user = users?.users?.find((u: any) => u.email === order.email)

  // Send cancellation email
  await sendEmailNotification(
    'order_cancelled',
    order.email,
    customerName,
    `SHOP-${order.order_number}`,
    order.total_price,
    user?.id
  )

  // Reverse loyalty points if applicable
  if (existingOrder?.user_id && existingOrder.user_id !== '00000000-0000-0000-0000-000000000000') {
    const pointsToRemove = calculateLoyaltyPoints(parseFloat(order.total_price))
    
    // Get current profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('loyalty_points')
      .eq('id', existingOrder.user_id)
      .single()

    if (profile) {
      const newPoints = Math.max(0, (profile.loyalty_points || 0) - pointsToRemove)
      
      await supabase
        .from('profiles')
        .update({ 
          loyalty_points: newPoints,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingOrder.user_id)

      // Create reversal transaction
      await supabase
        .from('loyalty_transactions')
        .insert({
          user_id: existingOrder.user_id,
          type: 'deducted',
          points: -pointsToRemove,
          description: `Points reversed for cancelled order #${order.order_number}`,
          order_id: `SHOP-${order.order_number}`
        })
    }
  }
}

async function awardLoyaltyPoints(supabase: any, userId: string, order: ShopifyOrder): Promise<number> {
  const points = calculateLoyaltyPoints(parseFloat(order.total_price))
  
  console.log(`Awarding ${points} loyalty points to user ${userId}`)

  // Get current profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('loyalty_points')
    .eq('id', userId)
    .single()

  if (!profile) {
    console.log('Profile not found for user')
    return 0
  }

  // Update loyalty points
  const newPoints = (profile.loyalty_points || 0) + points

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ 
      loyalty_points: newPoints,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (updateError) {
    console.error('Failed to update loyalty points:', updateError)
    return 0
  }

  // Create loyalty transaction
  const { error: txError } = await supabase
    .from('loyalty_transactions')
    .insert({
      user_id: userId,
      type: 'earned',
      points: points,
      description: `Points earned from order #${order.order_number}`,
      order_id: `SHOP-${order.order_number}`
    })

  if (txError) {
    console.error('Failed to create loyalty transaction:', txError)
  }

  console.log(`Loyalty points updated: ${profile.loyalty_points} -> ${newPoints}`)
  
  return points
}

function calculateLoyaltyPoints(orderTotal: number): number {
  // 1 point per PKR 100 spent
  return Math.floor(orderTotal / 100)
}

function mapShopifyStatus(fulfillmentStatus: string | null): string {
  if (!fulfillmentStatus) return 'pending'
  
  switch (fulfillmentStatus.toLowerCase()) {
    case 'fulfilled':
      return 'fulfilled'
    case 'partial':
      return 'processing'
    case 'unfulfilled':
      return 'pending'
    default:
      return 'pending'
  }
}
