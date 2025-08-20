import SupplierInventory from "@/src/screens/SupplierInventory";
import { useLocalSearchParams } from "expo-router";

export default function MAHER() {
  const { focus } = useLocalSearchParams<{ focus?: string }>();
  return (
    <SupplierInventory
      supplierId="MAHER"
      hideSearch={true}
      focusItemId={typeof focus === "string" ? focus : undefined}
    />
  );
}
