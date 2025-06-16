import React, { useState } from 'react';
import { User, Activity, Heart, Brain } from 'lucide-react';
import { PatientData } from '../types/api';
import { FormSection } from './FormSection';
import { FormField } from './FormField';

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
  isLoading: boolean;
}

export const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<PatientData>({
    age: 45,
    gender: 'Male',
    smoking: 'Never',
    alcohol_intake: 'None',
    exercise_hours: 2,
    diabetes: 'No',
    family_history: 'No',
    obesity: 'No',
    stress_level: 5,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PatientData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PatientData, string>> = {};

    if (formData.age < 18 || formData.age > 100) {
      newErrors.age = 'La edad debe estar entre 18 y 100 años';
    }

    if (formData.exercise_hours < 0 || formData.exercise_hours > 24) {
      newErrors.exercise_hours = 'Las horas de ejercicio deben estar entre 0 y 24';
    }

    if (formData.stress_level < 1 || formData.stress_level > 10) {
      newErrors.stress_level = 'El nivel de estrés debe estar entre 1 y 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateField = <K extends keyof PatientData>(
    field: K,
    value: PatientData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <FormSection title="Información Personal" icon={<User className="w-5 h-5 text-blue-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Edad" error={errors.age} required>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="18"
              max="100"
              required
            />
          </FormField>

          <FormField label="Género" required>
            <select
              value={formData.gender}
              onChange={(e) => updateField('gender', e.target.value as 'Male' | 'Female')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="Male">Masculino</option>
              <option value="Female">Femenino</option>
            </select>
          </FormField>
        </div>
      </FormSection>

      {/* Lifestyle Habits */}
      <FormSection title="Hábitos de Vida" icon={<Activity className="w-5 h-5 text-green-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Hábito de Fumar" required>
            <select
              value={formData.smoking}
              onChange={(e) => updateField('smoking', e.target.value as PatientData['smoking'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="Never">Nunca fumé</option>
              <option value="Former">Ex-fumador</option>
              <option value="Current">Fumador actual</option>
            </select>
          </FormField>

          <FormField label="Consumo de Alcohol" required>
            <select
              value={formData.alcohol_intake}
              onChange={(e) => updateField('alcohol_intake', e.target.value as PatientData['alcohol_intake'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="None">No consumo</option>
              <option value="Light">Ligero</option>
              <option value="Moderate">Moderado</option>
              <option value="Heavy">Alto</option>
            </select>
          </FormField>

          <FormField label="Horas de Ejercicio por Semana" error={errors.exercise_hours} required>
            <input
              type="number"
              value={formData.exercise_hours}
              onChange={(e) => updateField('exercise_hours', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="0"
              max="24"
              step="0.5"
              placeholder="ej: 3.5"
              required
            />
          </FormField>
        </div>
      </FormSection>

      {/* Medical Conditions */}
      <FormSection title="Condiciones Médicas" icon={<Heart className="w-5 h-5 text-red-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="¿Tiene Diabetes?" required>
            <select
              value={formData.diabetes}
              onChange={(e) => updateField('diabetes', e.target.value as 'Yes' | 'No')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="No">No</option>
              <option value="Yes">Sí</option>
            </select>
          </FormField>

          <FormField label="¿Historial Familiar de Enfermedad Cardíaca?" required>
            <select
              value={formData.family_history}
              onChange={(e) => updateField('family_history', e.target.value as 'Yes' | 'No')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="No">No</option>
              <option value="Yes">Sí</option>
            </select>
          </FormField>

          <FormField label="¿Tiene Obesidad?" required>
            <select
              value={formData.obesity}
              onChange={(e) => updateField('obesity', e.target.value as 'Yes' | 'No')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="No">No</option>
              <option value="Yes">Sí</option>
            </select>
          </FormField>
        </div>
      </FormSection>

      {/* Wellness */}
      <FormSection title="Bienestar" icon={<Brain className="w-5 h-5 text-purple-600" />}>
        <FormField label={`Nivel de Estrés (${formData.stress_level}/10)`} error={errors.stress_level} required>
          <div className="space-y-2">
            <input
              type="range"
              value={formData.stress_level}
              onChange={(e) => updateField('stress_level', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              min="1"
              max="10"
              step="1"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Muy bajo</span>
              <span>Moderado</span>
              <span>Muy alto</span>
            </div>
          </div>
        </FormField>
      </FormSection>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold text-lg
                 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed
                 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                 shadow-lg hover:shadow-xl"
      >
        {isLoading ? 'Analizando...' : 'Evaluar Riesgo Cardiovascular'}
      </button>
    </form>
  );
};