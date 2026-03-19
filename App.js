import { PortableText } from '@portabletext/react-native';

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';
import { client } from './src/lib/sanity';

const QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  publishedAt,
  body
}`;



export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  function fetchArticles() {
    setLoading(true);
    client.fetch(QUERY)
      .then(setArticles)
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchArticles() }, []);

  function startAddGoalHandler(){ setModalIsVisible(true) }
  
  function addGoalHandler(enteredGoal){
    if (!enteredGoal.trim()) return
    setCourseGoals((currentGoals)=>[
      ...currentGoals,
      {text: enteredGoal, id: Math.random().toString()}
    ])
    setModalIsVisible(false)
  }

  function deleteGoalHandler(id){
    setCourseGoals((currentGoals)=>
      currentGoals.filter((goal)=>goal.id !== id)
    )
  }

  const ptComponents = {
  block: {
    normal: ({ children }) => (
      <Text style={{ color: '#94A3B8', fontSize: 14, lineHeight: 22, marginTop: 8 }}>
        {children}
      </Text>
    ),
    h2: ({ children }) => (
      <Text style={{ color: '#F1F5F9', fontSize: 18, fontWeight: '700', marginTop: 10 }}>
        {children}
      </Text>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <Text style={{ fontWeight: '700', color: '#F1F5F9' }}>{children}</Text>
    ),
    em: ({ children }) => (
      <Text style={{ fontStyle: 'italic' }}>{children}</Text>
    ),
  },
}

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Goals</Text>
          <TouchableOpacity style={styles.addButton} onPress={startAddGoalHandler}>
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCancel={()=>setModalIsVisible(false)}/>

        {/* Goals */}
        <View style={styles.goalsContainer}>
          {courseGoals.length === 0 ? (
            <Text style={styles.emptyText}>No goals yet. Add one above!</Text>
          ) : (
            <FlatList
              data={courseGoals}
              keyExtractor={(item) => item.id}
              renderItem={(itemData) => (
                <GoalItem text={itemData.item.text} onDeleteItem={deleteGoalHandler} id={itemData.item.id}/>
              )}
              alwaysBounceVertical={false}
            />
          )}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Sanity Articles */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Articles</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Sanity CMS</Text>
          </View>
        </View>

        <FlatList
          data={articles}
          keyExtractor={(item) => item._id}
          refreshing={loading}
          onRefresh={fetchArticles}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.category}>{item.category ?? 'Uncategorized'}</Text>
                </View>
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.slug}>/{item.slug}</Text>
              {item.body && (
  <PortableText value={item.body} components={ptComponents} />
)}
            </View>
          )}
        />

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 56,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#0F172A',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    color: '#F1F5F9',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  addButton: {
    backgroundColor: '#F03E2F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  // Goals
  goalsContainer: {
    flex: 1,
    minHeight: 60,
  },
  emptyText: {
    color: '#475569',
    fontSize: 13,
    fontStyle: 'italic',
    paddingVertical: 8,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 16,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#F1F5F9',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  badge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F03E2F44',
  },
  badgeText: {
    color: '#F03E2F',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Cards
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F59E0B22',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  category: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#F1F5F9',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 22,
  },
  slug: {
    color: '#475569',
    fontSize: 11,
    fontFamily: 'Courier',
  },
});