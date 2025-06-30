import React from 'react';
import { Heart, Activity, Brain } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Cargando...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-12 h-12'
  };

  const containerSizeClasses = {
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12'
  };

  const steps = [
    { icon: Heart, text: 'Analizando factores de riesgo...', delay: '0s' },
    { icon: Activity, text: 'Procesando datos de salud...', delay: '0.5s' },
    { icon: Brain, text: 'Generando recomendaciones...', delay: '1s' }
  ];

  return (
    <div className={`flex flex-col items-center justify-center ${containerSizeClasses[size]}`}>
      {/* Main Loading Animation */}
      <div className="relative mb-8">
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping"></div>
        <div className="absolute inset-2 rounded-full bg-blue-500 opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Center heart icon */}
        <div className={`relative ${sizeClasses[size]} bg-blue-600 rounded-full p-3 flex items-center justify-center loading-pulse`}>
          <Heart className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Main message */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{message}</h3>
      
      {/* Processing steps */}
      <div className="space-y-3 max-w-sm">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div 
              key={index}
              className="flex items-center text-sm text-gray-600 opacity-0 animate-fade-in"
              style={{ animationDelay: step.delay, animationFillMode: 'forwards' }}
            >
              <div className="w-4 h-4 mr-3 text-blue-500">
                <Icon className="w-4 h-4" />
              </div>
              <span>{step.text}</span>
              <div className="ml-2 flex space-x-1">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-progress"></div>
      </div>
      
      <p className="text-xs text-gray-500 mt-4 text-center max-w-xs">
        Nuestro modelo de IA está analizando sus datos para generar una evaluación precisa y personalizada
      </p>
    </div>
  );
};