// App.tsx - aula 12, estado final
import { FlatList, Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";
import { ItemLista } from "./ItemLista";
import type { Vistoria } from "./types";
import { claro, escuro, toque } from "./tema";

const REGISTROS: Vistoria[] = [
  { idLocal: "1", equipamento: "Bomba 03",     status: "sincronizado" },
  { idLocal: "2", equipamento: "Painel A2",    status: "na_fila" },
  { idLocal: "3", equipamento: "Compressor 1", status: "erro" },
];

function ListaVazia() {
  return (
    <View style={styles.vazio}>
      <Text style={styles.vazioTitulo}>Nenhuma vistoria registrada</Text>
      <Text style={styles.vazioDetalhe}>
        Toque em "Nova vistoria" para comecar. O registro fica salvo no
        aparelho mesmo sem sinal.
      </Text>
    </View>
  );
}

export default function App() {
  const cores = useColorScheme() === "dark" ? escuro : claro;
  return (
    <View style={[styles.tela, { backgroundColor: cores.fundo }]}>
      <Text style={[styles.titulo, { color: cores.texto }]}>Operacao Campo</Text>
      <Text style={[styles.variante, { color: cores.textoFraco }]}>Variante B - Campo</Text>

      <FlatList
        data={REGISTROS}
        keyExtractor={(item) => item.idLocal}
        renderItem={({ item }) => (
          <Pressable
            hitSlop={8}
            style={{ minHeight: toque.minimo, justifyContent: "center" }}
            accessibilityRole="button"
            accessibilityLabel={`Vistoria ${item.equipamento}, ${item.status}`}
          >
            <ItemLista item={item} />
          </Pressable>
        )}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={<ListaVazia />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela:     { flex: 1, paddingTop: 60 },
  titulo:   { fontSize: 22, fontWeight: "bold", paddingHorizontal: 16 },
  variante: { fontSize: 14, paddingHorizontal: 16, marginBottom: 16 },
  vazio:       { padding: 24, alignItems: "center" },
  vazioTitulo: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  vazioDetalhe:{ fontSize: 14, color: "#5A5A5A", textAlign: "center" },
});
