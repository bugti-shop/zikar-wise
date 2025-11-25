import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import type { Zikar } from "./ZikarSelector";

interface AddCustomZikarProps {
  onAdd: (zikar: Zikar) => void;
  onCancel: () => void;
}

export const AddCustomZikar = ({ onAdd, onCancel }: AddCustomZikarProps) => {
  const [formData, setFormData] = useState({
    name: "",
    arabic: "",
    transliteration: "",
    defaultTarget: "33",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.arabic.trim()) {
      toast.error("Please fill in at least the name and Arabic text");
      return;
    }

    const target = parseInt(formData.defaultTarget);
    if (isNaN(target) || target <= 0 || target > 10000) {
      toast.error("Target must be between 1 and 10000");
      return;
    }

    const newZikar: Zikar = {
      id: `custom-${Date.now()}`,
      name: formData.name.trim(),
      arabic: formData.arabic.trim(),
      transliteration: formData.transliteration.trim() || formData.name.trim(),
      defaultTarget: target,
    };

    onAdd(newZikar);
    toast.success("Custom Zikr added successfully!");

    // Reset form
    setFormData({
      name: "",
      arabic: "",
      transliteration: "",
      defaultTarget: "33",
    });
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto border-2 border-islamic-teal">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-islamic-green flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Custom Zikr
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="arabic" className="text-foreground">
            Arabic Text <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="arabic"
            value={formData.arabic}
            onChange={(e) => setFormData({ ...formData, arabic: e.target.value })}
            placeholder="أَسْتَغْفِرُ ٱللَّٰهَ"
            className="text-3xl font-arabic text-center resize-none h-24"
            dir="rtl"
            required
          />
          <p className="text-xs text-muted-foreground">
            Enter the Arabic text for your Zikr
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Astaghfirullah"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transliteration" className="text-foreground">
            Transliteration / Meaning
          </Label>
          <Input
            id="transliteration"
            value={formData.transliteration}
            onChange={(e) => setFormData({ ...formData, transliteration: e.target.value })}
            placeholder="I seek forgiveness from Allah"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target" className="text-foreground">
            Default Target
          </Label>
          <Input
            id="target"
            type="number"
            min="1"
            max="10000"
            value={formData.defaultTarget}
            onChange={(e) => setFormData({ ...formData, defaultTarget: e.target.value })}
            placeholder="33"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-islamic-green hover:bg-islamic-green/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Zikr
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
