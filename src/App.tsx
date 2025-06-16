import React, { useState, useEffect } from 'react';
import { Heart, Activity, Shield } from 'lucide-react';
import { PatientForm } from './components/PatientForm';
import { RiskResults } from './components/RiskResults';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { apiService } from './services/api';
import { PatientData, PredictionResponse, HealthResponse } from './types/api';

type AppState = 'form' | 'loading' | 'results' | 'error';

function App() {
  const [state, setState] = useState<AppState>('form');
  const [results, setResults] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [apiHealth, setApiHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const health = await apiService.healthCheck();
      setApiHealth(health);
    } catch (error) {
      console.warn('API health check failed:', error);
    }
  };

  const handleFormSubmit = async (patientData: PatientData) => {
    setState('loading');
    setError('');

    try {
      const prediction = await apiService.predictRisk(patientData);
      setResults(prediction);
      setState('results');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      setState('error');
    }
  };

  const handleNewPrediction = () => {
    setState('form');
    setResults(null);
    setError('');
  };

  const handleRetry = () => {
    setState('form');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-600 p-3 rounded-xl mr-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CardioRisk AI</h1>
                <p className="text-gray-600">Evaluación de Riesgo Cardiovascular</p>
              </div>
            </div>
            
            {/* API Status */}
            {apiHealth && (
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  apiHealth.models_loaded ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm text-gray-600">
                  {apiHealth.models_loaded ? 'API Activa' : 'API Error'}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {state === 'form' && (
          <div className="text-center mb-8">
            <div className="flex justify-center space-x-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-xl">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Evalúa tu Riesgo Cardiovascular
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestra inteligencia artificial analiza 9 factores clave para brindarte una evaluación 
              personalizada de tu riesgo cardiovascular y recomendaciones específicas para tu salud.
            </p>
          </div>
        )}

        {/* Content Based on State */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 lg:p-8">
            {state === 'form' && (
              <PatientForm onSubmit={handleFormSubmit} isLoading={false} />
            )}

            {state === 'loading' && (
              <LoadingSpinner 
                message="Analizando sus factores de riesgo..." 
                size="lg" 
              />
            )}

            {state === 'results' && results && (
              <RiskResults 
                results={results} 
                onNewPrediction={handleNewPrediction} 
              />
            )}

            {state === 'error' && (
              <ErrorMessage 
                message={error} 
                onRetry={handleRetry} 
              />
            )}
          </div>
        </div>

        {/* Features */}
        {state === 'form' && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Evaluación Integral</h3>
              <p className="text-gray-600 text-sm">
                Análisis de 9 factores clave incluye edad, hábitos, condiciones médicas y estilo de vida
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">IA Médica</h3>
              <p className="text-gray-600 text-sm">
                Modelo Random Forest entrenado con datos clínicos para predicciones precisas
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recomendaciones</h3>
              <p className="text-gray-600 text-sm">
                Sugerencias personalizadas para reducir riesgos y mejorar la salud cardiovascular
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 CardioRisk AI. Esta herramienta es solo para fines informativos y no reemplaza 
            la consulta médica profesional.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;