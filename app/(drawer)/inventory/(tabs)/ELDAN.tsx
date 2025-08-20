import SupplierInventory from "@/src/screens/SupplierInventory";
import { useLocalSearchParams } from "expo-router";

export default function ELDAN() {
  const { focus } = useLocalSearchParams<{ focus?: string }>();
  return (
    <SupplierInventory
      supplierId="ELDAN"
      hideSearch={true}
      focusItemId={typeof focus === "string" ? focus : undefined}
    />
  );
}
