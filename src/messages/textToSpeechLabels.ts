import type {Locale} from '@/lib/i18n';

type TextToSpeechLabels = {
  listen: string;
  stop: string;
  unsupported: string;
};

export const localeLabelMap: Record<Locale, TextToSpeechLabels> = {
  th: {
    listen: 'ฟังเนื้อหา',
    stop: 'หยุดเสียง',
    unsupported: 'ไม่รองรับ Text-to-speech'
  },
  en: {
    listen: 'Listen',
    stop: 'Stop audio',
    unsupported: 'Text-to-speech not supported'
  }
};
