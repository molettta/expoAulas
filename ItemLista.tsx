// ItemLista.tsx - aula 12, estado final
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import type { StatusSync, Vistoria } from "./types";
import { textoDoStatus } from "./types";
import { claro, escuro } from "./tema";

type Props = { item: Vistoria };



function Badge({ status }: { status: StatusSync }) {
  const cores = useColorScheme() === "dark" ? escuro : claro;
  return (
    <View style={[styles.badge, { backgroundColor: cores.estado[status] }]}>
      <Text style={styles.badgeTexto}>{textoDoStatus(status)}</Text>
    </View>
  );
}

export function ItemLista({ item }: Props) {
  const cores = useColorScheme() === "dark" ? escuro : claro;
  return (
    <View style={[styles.card, { backgroundColor: cores.superficie }]}>
      <View style={styles.info}>
        <Text style={[styles.titulo, { color: cores.texto }]}>{item.equipamento}</Text>
        <Text style={[styles.detalhe, { color: cores.textoFraco }]}>
          {item.observacao ?? "sem observacao"}
        </Text>
      </View>
      <Badge status={item.status} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    gap: 12, padding: 16, borderRadius: 12,
  },
  info:    { flex: 1 },
  titulo:  { fontSize: 18, fontWeight: "600" },
  detalhe: { fontSize: 14 },
  badge:      { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  badgeTexto: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
});
