
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Manual Note type matching Supabase "notes" table
type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // Confirm user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      fetchNotes();
    })();
    // eslint-disable-next-line
  }, []);

  async function fetchNotes() {
    setLoading(true);
    const { data, error } = await supabase
      // @ts-ignore: notes table exists in schema
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading notes",
        description: error.message,
      });
    } else {
      // Defensive: filter only objects with required props
      const safeNotes = Array.isArray(data)
        ? data.filter(
            (n): n is Note =>
              n &&
              typeof n.id === "string" &&
              typeof n.title === "string" &&
              typeof n.content === "string" &&
              typeof n.created_at === "string" &&
              typeof n.updated_at === "string" &&
              typeof n.user_id === "string"
          )
        : [];
      setNotes(safeNotes);
    }
    setLoading(false);
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Get the current user to insert user_id (required by RLS & table)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Not signed in",
        description: "Please sign in to add notes.",
      });
      navigate("/auth");
      return;
    }
    const { data, error } = await supabase
      // @ts-ignore: notes table exists in schema
      .from("notes")
      .insert([
        { title, content, user_id: user.id }
      ]);
    setLoading(false);
    if (error) {
      toast({
        variant: "destructive",
        title: "Could not save note.",
        description: error.message,
      });
    } else {
      setTitle("");
      setContent("");
      fetchNotes();
      toast({ title: "Note Saved!" });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-kapraye-burgundy font-bold">
              Your Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddNote} className="space-y-3 mb-6">
              <Input
                type="text"
                placeholder="Note title"
                value={title}
                maxLength={60}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Write your note here..."
                value={content}
                maxLength={2000}
                rows={4}
                onChange={e => setContent(e.target.value)}
                required
              />
              <Button type="submit" disabled={loading || !title.trim() || !content.trim()}>
                {loading ? "Saving..." : "Add Note"}
              </Button>
            </form>
            <div>
              {notes.length === 0 && <div className="text-gray-400 text-center">No notes found.</div>}
              <ul className="space-y-3">
                {notes.map(note => (
                  <li key={note.id}>
                    <div className="border rounded-lg p-3 bg-white">
                      <div className="font-medium">{note.title}</div>
                      <div className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{note.content}</div>
                      <div className="text-xs text-gray-400 text-right mt-2">
                        {new Date(note.updated_at || note.created_at).toLocaleString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
