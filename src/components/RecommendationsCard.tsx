import React from 'react';
import { 
  Heart, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Phone, 
  Stethoscope,
  Activity,
  Brain,
  Shield,
  Target,
  TrendingUp
} from 'lucide-react';

interface RecommendationsCardProps {
  recommendations: string[];
  riskLevel: string;
}

export const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ 
  recommendations, 
  riskLevel 
}) => {
  const getRecommendationConfig = (recommendation: string) => {
    const rec = recommendation.toLowerCase();
    
    // Urgentes (rojas)
    if (rec.includes('🚨') || rec.includes('crítico') || rec.includes('urgente') || 
        rec.includes('inmediatamente') || rec.includes('deje de fumar hoy')) {
      return {
        priority: 'urgent',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800',
        iconColor: 'text-red-600',
        icon: <AlertTriangle className="w-5 h-5" />,
        dotColor: 'bg-red-500'
      };
    }
    
    // Importantes (naranjas)
    if (rec.includes('⚠️') || rec.includes('importante') || rec.includes('programe') || 
        rec.includes('realice exámenes') || rec.includes('chequeos')) {
      return {
        priority: 'important',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-800',
        iconColor: 'text-orange-600',
        icon: <Clock className="w-5 h-5" />,
        dotColor: 'bg-orange-500'
      };
    }
    
    // Médicas (azules)
    if (rec.includes('📊') || rec.includes('💊') || rec.includes('🩺') || 
        rec.includes('exámenes') || rec.includes('medicación') || rec.includes('cardiólogo')) {
      return {
        priority: 'medical',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
        iconColor: 'text-blue-600',
        icon: <Stethoscope className="w-5 h-5" />,
        dotColor: 'bg-blue-500'
      };
    }
    
    // Estilo de vida (verdes)
    if (rec.includes('🏃‍♂️') || rec.includes('🚶‍♂️') || rec.includes('🥗') || 
        rec.includes('ejercicio') || rec.includes('dieta') || rec.includes('peso')) {
      return {
        priority: 'lifestyle',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-800',
        iconColor: 'text-green-600',
        icon: <Activity className="w-5 h-5" />,
        dotColor: 'bg-green-500'
      };
    }
    
    // Mental/Estrés (púrpuras)
    if (rec.includes('🧘‍♂️') || rec.includes('😴') || rec.includes('🗣️') || 
        rec.includes('estrés') || rec.includes('sueño') || rec.includes('psicológico')) {
      return {
        priority: 'mental',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        textColor: 'text-purple-800',
        iconColor: 'text-purple-600',
        icon: <Brain className="w-5 h-5" />,
        dotColor: 'bg-purple-500'
      };
    }
    
    // Positivas/Felicitaciones (verdes claras)
    if (rec.includes('✅') || rec.includes('🌟') || rec.includes('🛡️') || rec.includes('👏') || 
        rec.includes('excelente') || rec.includes('felicitaciones') || rec.includes('continúe')) {
      return {
        priority: 'positive',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        textColor: 'text-emerald-800',
        iconColor: 'text-emerald-600',
        icon: <CheckCircle className="w-5 h-5" />,
        dotColor: 'bg-emerald-500'
      };
    }
    
    // Por defecto
    return {
      priority: 'general',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-800',
      iconColor: 'text-gray-600',
      icon: <Heart className="w-5 h-5" />,
      dotColor: 'bg-gray-500'
    };
  };

  const priorityOrder = {
    urgent: 0,
    important: 1,
    medical: 2,
    lifestyle: 3,
    mental: 4,
    positive: 5,
    general: 6
  };

  const sortedRecommendations = recommendations
    .map(rec => ({ text: rec, config: getRecommendationConfig(rec) }))
    .sort((a, b) => 
      priorityOrder[a.config.priority as keyof typeof priorityOrder] - 
      priorityOrder[b.config.priority as keyof typeof priorityOrder]
    );

  const getHeaderConfig = () => {
    switch (riskLevel) {
      case 'Alto Riesgo':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
          title: 'Plan de Acción Inmediato',
          subtitle: 'Recomendaciones prioritarias para su salud cardiovascular'
        };
      case 'Riesgo Moderado':
        return {
          icon: <Target className="w-6 h-6 text-orange-600" />,
          title: 'Plan de Mejora Personalizado',
          subtitle: 'Estrategias para optimizar su salud cardiovascular'
        };
      default:
        return {
          icon: <TrendingUp className="w-6 h-6 text-green-600" />,
          title: 'Plan de Mantenimiento',
          subtitle: 'Recomendaciones para mantener su excelente estado cardiovascular'
        };
    }
  };

  const headerConfig = getHeaderConfig();
  const urgentCount = sortedRecommendations.filter(r => r.config.priority === 'urgent').length;
  const importantCount = sortedRecommendations.filter(r => r.config.priority === 'important').length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {headerConfig.icon}
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">{headerConfig.title}</h3>
              <p className="text-sm text-gray-600">{headerConfig.subtitle}</p>
            </div>
          </div>
          
          {(urgentCount > 0 || importantCount > 0) && (
            <div className="flex items-center space-x-2">
              {urgentCount > 0 && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                  {urgentCount} Urgente{urgentCount > 1 ? 's' : ''}
                </span>
              )}
              {importantCount > 0 && (
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                  {importantCount} Importante{importantCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {sortedRecommendations.map((item, index) => (
            <div 
              key={index}
              className={`${item.config.bgColor} ${item.config.borderColor} border rounded-lg p-4 transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start">
                <div className={`${item.config.iconColor} mr-3 mt-0.5 flex-shrink-0`}>
                  {item.config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2">
                    <div className={`w-2 h-2 ${item.config.dotColor} rounded-full mr-2`}></div>
                    <span className={`text-xs font-medium ${item.config.textColor} uppercase tracking-wide`}>
                      {item.config.priority === 'urgent' && 'URGENTE'}
                      {item.config.priority === 'important' && 'IMPORTANTE'}
                      {item.config.priority === 'medical' && 'MÉDICO'}
                      {item.config.priority === 'lifestyle' && 'ESTILO DE VIDA'}
                      {item.config.priority === 'mental' && 'BIENESTAR MENTAL'}
                      {item.config.priority === 'positive' && 'FELICITACIONES'}
                      {item.config.priority === 'general' && 'RECOMENDACIÓN'}
                    </span>
                  </div>
                  <p className={`${item.config.textColor} leading-relaxed`}>
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Información adicional para alto riesgo */}
        {riskLevel === 'Alto Riesgo' && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <h4 className="font-semibold text-red-800">¿Necesita ayuda inmediata?</h4>
                <p className="text-sm text-red-700">
                  Si experimenta dolor en el pecho, dificultad para respirar o mareos, busque atención médica inmediata.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Información motivacional para bajo riesgo */}
        {riskLevel === 'Bajo Riesgo' && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <h4 className="font-semibold text-green-800">¡Siga así!</h4>
                <p className="text-sm text-green-700">
                  Su estilo de vida saludable es la mejor medicina preventiva. Mantenga estos hábitos excelentes.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
