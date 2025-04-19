
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
  reviews?: Review[];
}

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Sarah M.",
    rating: 5,
    comment: "Perfect fit and amazing quality! The fabric feels luxurious and it washes well.",
    date: "2025-03-15",
    verified: true
  },
  {
    id: "2",
    userName: "James R.",
    rating: 4,
    comment: "Great shirt, slightly longer than expected but overall very satisfied.",
    date: "2025-03-10",
    verified: true
  },
  {
    id: "3",
    userName: "Emma K.",
    rating: 5,
    comment: "This is exactly what I was looking for. The color is perfect!",
    date: "2025-03-05",
    verified: false
  }
];

export function ProductReviews({ productId, reviews: initialReviews = mockReviews }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [sortBy, setSortBy] = useState("newest");
  const { toast } = useToast();

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment.trim().length < 10) {
      toast({
        title: "Review too short",
        description: "Please write at least 10 characters",
        variant: "destructive"
      });
      return;
    }

    const review: Review = {
      id: Math.random().toString(36).substring(7),
      userName: "Anonymous User",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: "" });
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default: // "newest"
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Customer Reviews</h3>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({reviews.length} reviews)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="highest">Highest Rating</SelectItem>
              <SelectItem value="lowest">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                type="button"
                variant="ghost"
                className="p-0 hover:bg-transparent"
                onClick={() => setNewReview({ ...newReview, rating: star })}
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= newReview.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </Button>
            ))}
          </div>
          <Textarea
            placeholder="Share your experience with this product..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="min-h-[100px]"
            required
          />
          <Button type="submit" className="w-full sm:w-auto">
            Submit Review
          </Button>
        </form>
      </div>

      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="text-xs text-green-600 font-medium">Verified Purchase</span>
                  )}
                </div>
                <p className="font-medium">{review.userName}</p>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
