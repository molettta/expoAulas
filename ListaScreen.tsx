// ListaScreen.tsx - era o corpo do App.tsx de 04/09
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";
import { ItemLista } from "./ItemLista";
import type { Vistoria } from "./types";
import { claro, escuro, toque } from "./tema";
import { carregar } from "./armazenamento";
import type { RootStackParamList } from "./App";

type Props = NativeStackScreenProps<RootStackParamList, "Lista">;

function ListaVazia() {
  const cores = useColorScheme() === "dark" ? escuro : claro;
  return (
    <View style={styles.vazio}>
      <Text style={[styles.vazioTitulo, { color: cores.texto }]}>
        Nenhuma vistoria registrada
      </Text>
      <Text style={[styles.vazioTexto, { color: cores.textoFraco }]}>
        Toque em "Nova vistoria" para comecar. O registro fica salvo no
        aparelho mesmo sem sinal.
      </Text>
    </View>
  );
}

export default function ListaScreen({ navigation }: Props) {
  const cores = useColorScheme() === "dark" ? escuro : claro;
  const [vistorias, setVistorias] = useState<Vistoria[]>([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let vivo = true;
      carregar().then((lista) => {
        if (vivo) { setVistorias(lista); setCarregando(false); }
      });
      return () => { vivo = false; };
    }, [])
  );

  if (carregando) {
    return (
      <View style={[styles.tela, { backgroundColor: cores.fundo }]}>
        <Text style={{ color: cores.textoFraco, padding: 16 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.tela, { backgroundColor: cores.fundo }]}>
      <FlatList
        data={vistorias}
        keyExtractor={(item) => item.idLocal}
        renderItem={({ item }) => <ItemLista item={item} />}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={<ListaVazia />}
      />
      <Pressable
        onPress={() => navigation.navigate("NovaVistoria")}
        style={[styles.botao, { backgroundColor: cores.estado.sincronizado,
                                minHeight: toque.minimo }]}
        accessibilityRole="button"
        accessibilityLabel="Nova vistoria"
      >
        <Text style={styles.botaoTexto}>+ Nova vistoria</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tela:  { flex: 1 },
  vazio: { alignItems: "center", paddingTop: 48, gap: 8 },
  vazioTitulo: { fontSize: 16, fontWeight: "600" },
  vazioTexto:  { fontSize: 14, textAlign: "center" },
  botao: { margin: 16, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  botaoTexto: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
