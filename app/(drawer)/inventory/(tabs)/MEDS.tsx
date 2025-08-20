import SupplierInventory from "@/src/screens/SupplierInventory";
import { useLocalSearchParams } from "expo-router";

export default function MEDS() {
  const { focus } = useLocalSearchParams<{ focus?: string }>();
  return (
    <SupplierInventory
      supplierId="MEDS"
      hideSearch={true}
      focusItemId={typeof focus === "string" ? focus : undefined}
    />
  );
}
