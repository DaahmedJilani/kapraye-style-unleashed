import { ShopifyCategoryPage } from "../ShopifyCategoryPage";

export default function KidsBabiesPage() {
  return (
    <ShopifyCategoryPage
      title="Babies Collection"
      description="Soft and gentle clothing for babies. Safe, comfortable, and adorable pieces for your little ones."
      query="tag:babies OR tag:baby OR (tag:kids AND tag:baby) OR product_type:baby"
    />
  );
}
