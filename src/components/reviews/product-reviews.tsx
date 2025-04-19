
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
  reviews?: Review[];
}

export function ProductReviews({ productId, reviews: initialReviews = [] }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const { toast } = useToast();

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: Math.random().toString(36).substring(7),
      userName: "Anonymous User",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString(),
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: "" });
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-6">
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
          <Input
            placeholder="Write your review..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
          <Button type="submit">Submit Review</Button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
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
                  <span className="text-sm text-muted-foreground">
                    by {review.userName} on {review.date}
                  </span>
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
