import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import CardTemplate from "../../components/cardTemplate";
import { DashboardCard, dashboardCards } from "./dashboardCards";

export default function Dashboard() {
  const router = useRouter();
  return (
    <ScrollView>
      {dashboardCards.map((card: DashboardCard) => (
        <CardTemplate
          key={card.title}
          title={card.title}
          icon={card.icon}
          preview={card.preview}
          onPress={() => router.replace(card.navigateTo as any)}
        />
      ))}
    </ScrollView>
  );
}
