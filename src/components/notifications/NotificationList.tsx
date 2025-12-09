import { formatDistanceToNow } from "date-fns";
import { Package, Truck, CheckCircle, XCircle, Star, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  data: unknown;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  unreadCount: number;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "order_confirmed":
      return <Package className="h-5 w-5 text-primary" />;
    case "order_shipped":
      return <Truck className="h-5 w-5 text-blue-500" />;
    case "order_delivered":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "order_cancelled":
      return <XCircle className="h-5 w-5 text-destructive" />;
    case "loyalty_points":
      return <Star className="h-5 w-5 text-yellow-500" />;
    default:
      return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
};

export function NotificationList({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  unreadCount,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center">
        <Bell className="mx-auto h-12 w-12 text-muted-foreground/30" />
        <p className="mt-4 text-sm text-muted-foreground">No notifications yet</p>
        <p className="text-xs text-muted-foreground/70">
          You'll see order updates and rewards here
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="font-semibold">Notifications</h3>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            className="text-xs text-primary hover:text-primary/80"
          >
            Mark all as read
          </Button>
        )}
      </div>
      <ScrollArea className="h-[300px]">
        <div className="divide-y">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => !notification.is_read && onMarkAsRead(notification.id)}
              className={cn(
                "flex w-full gap-3 p-4 text-left transition-colors hover:bg-muted/50",
                !notification.is_read && "bg-primary/5"
              )}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={cn(
                      "text-sm font-medium truncate",
                      !notification.is_read && "text-foreground",
                      notification.is_read && "text-muted-foreground"
                    )}
                  >
                    {notification.title}
                  </p>
                  {!notification.is_read && (
                    <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {formatDistanceToNow(new Date(notification.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
