import { Href, useRouter } from "expo-router";
import { ScrollView } from "react-native";
import CardTemplate from "../../components/cardTemplate";
import { DashboardCard, dashboardCards } from "./dashboardCards";

export default function Dashboard() {
  const router = useRouter();
  return (
    <ScrollView>
      {dashboardCards.map((card: DashboardCard, idx: number) => (
        <CardTemplate
          key={`${card.title}-${idx}`} // ensure unique key
          title={card.title}
          icon={card.icon}
          preview={card.preview}
          onPress={() => router.replace(card.navigateTo as Href)}
        />
      ))}
    </ScrollView>
  );
}
