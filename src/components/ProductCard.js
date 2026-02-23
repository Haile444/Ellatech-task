import { View, Text, TouchableOpacity, Platform } from 'react-native';

export const ProductCard = ({ item, onAdjust }) => {
  const web = Platform.OS === 'web';
  const webStyles = web ? {
    card: {
      backgroundColor: '#ffffff',
      padding: 16,
      borderRadius: 18,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#f1f5f9',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    left: { flex: 1 },
    name: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
    sku: { fontSize: 12, color: '#94a3b8', marginTop: 4 },
    price: { color: '#059669', fontWeight: '700', marginTop: 6 },
    lastUpdated: { fontSize: 10, color: '#94a3b8', fontStyle: 'italic' },
    controls: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 12, padding: 6 },
    btn: { backgroundColor: '#ffffff', width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
    qty: { marginHorizontal: 12, fontWeight: '700', fontSize: 18, color: '#334155' }
  } : {};

  return (
    <View className="bg-white p-4 rounded-2xl mb-3 border border-slate-100 flex-row justify-between items-center shadow-sm" style={webStyles.card}>
      <View className="flex-1" style={webStyles.left}>
        <Text className="font-bold text-slate-800 text-lg" style={webStyles.name}>{item.name}</Text>
        <Text className="text-xs text-slate-400 font-medium" style={webStyles.sku}>SKU: {item.sku}</Text>
        <Text className="text-emerald-600 font-bold mt-1" style={webStyles.price}>${item.price}</Text>
        <Text className="text-[10px] text-slate-400 italic" style={webStyles.lastUpdated}>Last Updated: {item.lastUpdated}</Text>
      </View>
      <View className="flex-row items-center bg-slate-100 rounded-xl p-1" style={webStyles.controls}>
        <TouchableOpacity 
          onPress={() => onAdjust(item.sku, -1)} 
          className="bg-white w-10 h-10 rounded-lg shadow-sm items-center justify-center"
          style={webStyles.btn}
        >
          <Text className="font-bold text-xl">-</Text>
        </TouchableOpacity>
        <Text className="mx-4 font-bold text-xl text-slate-700" style={webStyles.qty}>{item.quantity}</Text>
        <TouchableOpacity 
          onPress={() => onAdjust(item.sku, 1)} 
          className="bg-white w-10 h-10 rounded-lg shadow-sm items-center justify-center"
          style={webStyles.btn}
        >
          <Text className="font-bold text-xl">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};