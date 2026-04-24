import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, SectionList,
  StyleSheet, SafeAreaView, TouchableOpacity
} from 'react-native';

import { PRODUCTS } from './data/products';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [refreshing, setRefreshing] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const [isSection, setIsSection] = useState(false);
  const [sortType, setSortType] = useState('default');

  const categories = ['Semua', 'Merch', 'Album', 'Photocard', 'Poster', 'Fashion'];

  const filtered = useMemo(() => {
    let data = PRODUCTS.filter(item =>
      (category === 'Semua' || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    // SORT
    if (sortType === 'low') data.sort((a, b) => a.price - b.price);
    if (sortType === 'high') data.sort((a, b) => b.price - a.price);
    if (sortType === 'rating') data.sort((a, b) => b.rating - a.rating);

    return data;
  }, [search, category, sortType]);

  // SECTION GROUP
  const sections = useMemo(() => {
    const group = {};
    filtered.forEach(item => {
      if (!group[item.category]) group[item.category] = [];
      group[item.category].push(item);
    });

    return Object.keys(group).map(key => ({
      title: key,
      data: group[key]
    }));
  }, [filtered]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>💙 KPOP Shop</Text>
        <Text>{filtered.length} Produk</Text>
      </View>

      {/* SEARCH */}
      <SearchBar value={search} onChange={setSearch} />

      {/* FILTER */}
      <View style={styles.row}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.btn, category === cat && styles.active]}
            onPress={() => setCategory(cat)}
          >
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SORT */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => setSortType('low')}>
          <Text>💸 Termurah</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => setSortType('high')}>
          <Text>💰 Termahal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => setSortType('rating')}>
          <Text>⭐ Rating</Text>
        </TouchableOpacity>
      </View>

      {/* TOGGLE */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => setIsGrid(!isGrid)}>
          <Text>{isGrid ? '📋 List' : '🔲 Grid'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => setIsSection(!isSection)}>
          <Text>{isSection ? '📄 Flat' : '📂 Section'}</Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      {isSection ? (
        <SectionList
          sections={sections}
          renderItem={({ item }) => <ProductCard item={item} isGrid={false} />}
          renderSectionHeader={({ section }) => (
            <Text style={styles.section}>{section.title}</Text>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={filtered}
          renderItem={({ item }) => <ProductCard item={item} isGrid={isGrid} />}
          keyExtractor={(item) => item.id}
          numColumns={isGrid ? 2 : 1}
          refreshing={refreshing}
          onRefresh={onRefresh}

          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text style={{ fontSize: 50 }}>🔍</Text>
              <Text>Produk tidak ditemukan</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#bae6fd' },

  header: {
    backgroundColor: '#7dd3fc',
    margin: 12,
    padding: 16,
    borderRadius: 16,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },

  btn: {
    backgroundColor: '#e0f2fe',
    padding: 8,
    borderRadius: 20,
    margin: 4,
  },

  active: {
    backgroundColor: '#38bdf8',
  },

  section: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },

  empty: {
    alignItems: 'center',
    marginTop: 60,
  },
});