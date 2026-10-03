import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';

// IMPORTANT: For Android Emulators, localhost is 10.0.2.2. For iOS/Web, it is localhost.
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';

const Stack = createNativeStackNavigator();

// ==========================================
// 1. QUESTIONNAIRE SCREEN (Mobile)
// ==========================================
function QuestionnaireScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState({
    basics: { size: '', provider: '', spend: 0, currency: 'USD' },
    infra: { compute: 0, storage: 0, traffic: '' },
    goals: { costIssues: '', performance: '', growth: '' },
    advanced: { monitoring: '', scaling: '', reserved: '' }
  });

  const finishSetup = async () => {
    setLoading(true);
    try {
      // In a real app, you'd have login/auth. We'll bypass auth for the mobile demo
      // and hit the backend /api/ai/generate-report directly, or simulate the logic.
      
      // For this research paper demo, we will pass companyData to Dashboard to render locally
      navigation.navigate('Dashboard', { companyData });
    } catch (err) {
      console.error(err);
      alert('Error saving data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Cloud Basics</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Cloud Provider (AWS, Azure, GCP)"
          placeholderTextColor="#9ca3af"
          onChangeText={(text) => setCompanyData({...companyData, basics: {...companyData.basics, provider: text}})}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Monthly Cloud Spend (USD)"
          keyboardType="numeric"
          placeholderTextColor="#9ca3af"
          onChangeText={(text) => setCompanyData({...companyData, basics: {...companyData.basics, spend: Number(text)}})}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Number of Servers"
          keyboardType="numeric"
          placeholderTextColor="#9ca3af"
          onChangeText={(text) => setCompanyData({...companyData, infra: {...companyData.infra, compute: Number(text)}})}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Storage (GB/TB)"
          placeholderTextColor="#9ca3af"
          onChangeText={(text) => setCompanyData({...companyData, infra: {...companyData.infra, storage: Number(text)}})}
        />
        
        <TouchableOpacity style={styles.button} onPress={finishSetup} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Generate AI Optimization 🚀</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ==========================================
// 2. DASHBOARD SCREEN (Mobile)
// ==========================================
function DashboardScreen({ route }) {
  const { companyData } = route.params;
  const [awsData, setAwsData] = useState(null);
  const [aiReport, setAiReport] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  // Fetch AI Report on load
  useEffect(() => {
    fetchAiReport();
  }, []);

  const fetchAiReport = async () => {
    setLoadingAI(true);
    try {
      const res = await axios.post(`${API_URL}/api/ai/generate-report`, {
        companyData: companyData
      });
      setAiReport(res.data.report);
    } catch (err) {
      console.error("AI Error:", err.message);
      setAiReport("⚠️ Failed to reach backend API. Ensure server is running and API_URL is correct for your emulator/device.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Optimization Dashboard</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Current Reported Spend</Text>
        <Text style={styles.metric}>${companyData?.basics?.spend || 0}</Text>
      </View>

      <View style={[styles.card, { borderColor: '#a855f7', borderWidth: 2 }]}>
        <Text style={styles.title}>🤖 AI Cloud Architect Report</Text>
        {loadingAI ? (
          <ActivityIndicator size="large" color="#a855f7" style={{ marginVertical: 20 }} />
        ) : (
          <Text style={styles.aiText}>{aiReport}</Text>
        )}
      </View>
    </ScrollView>
  );
}

// ==========================================
// NAVIGATION STACK
// ==========================================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ 
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} options={{ title: 'Nivaar Mobile' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Cloud Insights' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0f172a',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 5,
  },
  metric: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ade80',
  },
  input: {
    backgroundColor: '#0f172a',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  aiText: {
    color: '#cbd5e1',
    lineHeight: 24,
    fontSize: 15,
    marginTop: 10,
  }
});
