import React, { useState } from 'react';
import { Platform, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';

// Load compiled Tailwind CSS on web (Metro/webpack may not run PostCSS reliably here)
if (Platform.OS === 'web') {
  require('./output.css');
} else {
  require('./global.css');
}
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Input } from './src/components/Input';
import { ProductCard } from './src/components/ProductCard';

export default function App() {
  const [user, setUser] = useState({ email: '', fullName: '', registered: false });
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ sku: '', name: '', price: '', qty: '' });
  const [page, setPage] = useState(1);

  const handleRegister = () => {
    if (!user.email.includes('@') || !user.fullName) return Alert.alert("Error", "Valid name and email required");
    setUser({ ...user, registered: true });
  };
  
  const addProduct = () => {
    if (!form.sku || !form.name || !form.price || !form.qty) return Alert.alert("Error", "All fields required");
    if (products.some(p => p.sku === form.sku)) return Alert.alert("Error", "SKU must be unique");

    const product = {
      sku: form.sku,
      name: form.name,
      price: form.price,
      quantity: parseInt(form.qty) || 0,
      lastUpdated: new Date().toLocaleTimeString(),
    };
    setProducts(prev => [...prev, product]);
    logAction(form.sku, 'INITIAL', parseInt(form.qty) || 0);
    setForm({ sku: '', name: '', price: '', qty: '' });
  };

  const adjustStock = (sku, change) => {
    setProducts(prev => prev.map(p => {
      if (p.sku === sku) {
        const newQty = p.quantity + change;
        if (newQty < 0) return p;
        logAction(sku, change > 0 ? 'ADD' : 'REMOVE', Math.abs(change));
        return { ...p, quantity: newQty, lastUpdated: new Date().toLocaleTimeString() };
      }
      return p;
    }));
  };

  const logAction = (sku, type, amt) => {
    setTransactions(prev => [{ id: Date.now(), sku, type, amt, time: new Date().toLocaleTimeString() }, ...prev]);
  };
  return (
    <SafeAreaProvider>
      {!user.registered ? (
        <SafeAreaView className="flex-1 bg-slate-50 p-6 justify-center" style={{ flex: 1, backgroundColor: '#f8fafc', padding: 24, justifyContent: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 4 }}>
            <Text className="text-3xl font-black mb-6 text-slate-800 text-center" style={{ fontSize: 28, fontWeight: '800', marginBottom: 16, color: '#0f172a', textAlign: 'center' }}>Ellatech Setup</Text>
            <Input placeholder="Full Name" onChangeText={t => setUser({...user, fullName: t})} />
            <Input placeholder="Email" keyboardType="email-address" onChangeText={t => setUser({...user, email: t})} />
            <TouchableOpacity className="bg-blue-600 p-4 rounded-2xl shadow-lg" onPress={handleRegister} style={{ backgroundColor: '#1e40af', padding: 12, borderRadius: 16, marginTop: 8 }}>
              <Text className="text-white text-center font-bold text-lg" style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>Enter Dashboard</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView className="flex-1 bg-slate-50" style={{ flex: 1, backgroundColor: '#f8fafc' }}>
          <ScrollView className="p-5" contentContainerStyle={{ padding: 20 }}>
            <Text className="text-2xl font-bold text-slate-800 mb-6">Inventory Management</Text>

            <View className="bg-blue-50 p-5 rounded-3xl mb-8 border border-blue-100" style={{ backgroundColor: '#eef2ff', padding: 16, borderRadius: 18, marginBottom: 18 }}>
              <Text className="font-bold text-blue-800 mb-4">Add New Product</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <View style={{ width: '48%' }}><Input placeholder="SKU" value={form.sku} onChangeText={t => setForm({...form, sku: t})} /></View>
                <View style={{ width: '48%' }}><Input placeholder="Name" value={form.name} onChangeText={t => setForm({...form, name: t})} /></View>
                <View style={{ width: '48%' }}><Input placeholder="Price" keyboardType="numeric" value={form.price} onChangeText={t => setForm({...form, price: t})} /></View>
                <View style={{ width: '48%' }}><Input placeholder="Qty" keyboardType="numeric" value={form.qty} onChangeText={t => setForm({...form, qty: t})} /></View>
              </View>
              <TouchableOpacity className="bg-blue-800 p-4 rounded-xl" onPress={addProduct} style={{ backgroundColor: '#1e40af', padding: 12, borderRadius: 12, marginTop: 10 }}>
                <Text className="text-white text-center font-bold">Register Product</Text>
              </TouchableOpacity>
            </View>

            {products.map(item => <ProductCard key={item.sku} item={item} onAdjust={adjustStock} />)}

            <Text className="text-xl font-bold text-slate-800 mt-8 mb-4">History</Text>
            <View className="bg-white rounded-2xl shadow-sm mb-20 overflow-hidden" style={{ backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', marginBottom: 40 }}>
              {transactions.slice((page-1)*5, page*5).map(log => (
                <View key={log.id} className="p-4 border-b border-slate-50 flex-row justify-between" style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text className="font-medium">{log.sku} - {log.type}</Text>
                  <Text className="text-slate-400">{log.time}</Text>
                </View>
              ))}
              <View className="flex-row justify-between p-4 bg-slate-50" style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#f8fafc' }}>
                <TouchableOpacity onPress={() => setPage(p => Math.max(1, p-1))}><Text className="text-blue-600 font-bold">Back</Text></TouchableOpacity>
                <Text className="text-slate-500 font-medium">Page {page}</Text>
                <TouchableOpacity onPress={() => setPage(p => p+1)}><Text className="text-blue-600 font-bold">Next</Text></TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}