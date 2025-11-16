'use client';

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {RefObject} from 'react';
import type {Locale} from '@/lib/i18n';
import {SpeakerIcon} from '@/components/icon/SpeakerIcon';
import {localeLabelMap} from '@/messages/textToSpeechLabels';

interface TextToSpeechControlProps {
  contentRef: RefObject<HTMLElement>;
  locale: Locale;
}

export function TextToSpeechControl({contentRef, locale}: TextToSpeechControlProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.speechSynthesis === 'undefined') {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const handleVoicesChange = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChange);
    handleVoicesChange();

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window === 'undefined' || typeof window.speechSynthesis === 'undefined') {
        return;
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const selectedVoice = useMemo(() => {
    if (!voices.length) {
      return null;
    }
    const localePrefix = locale.toLowerCase();
    return (
      voices.find((voice) => voice.lang?.toLowerCase().startsWith(localePrefix)) ??
      voices.find((voice) => voice.lang?.toLowerCase().includes(localePrefix)) ??
      voices[0]
    );
  }, [locale, voices]);

  const stop = useCallback(() => {
    if (!isSupported || typeof window === 'undefined' || typeof window.speechSynthesis === 'undefined') {
      return;
    }
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback(() => {
    if (
      !isSupported ||
      typeof window === 'undefined' ||
      typeof window.speechSynthesis === 'undefined' ||
      !contentRef.current
    ) {
      return;
    }

    const text = contentRef.current.innerText?.trim();
    if (!text) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang =
      selectedVoice?.lang ?? (locale === 'th' ? 'th-TH' : locale === 'en' ? 'en-US' : 'en-US');
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [contentRef, isSupported, locale, selectedVoice]);

  const handleToggle = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak();
    }
  };

  if (!isSupported) {
    return (
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {localeLabelMap[locale]?.unsupported ?? localeLabelMap.en.unsupported}
      </p>
    );
  }

  const labels = localeLabelMap[locale] ?? localeLabelMap.en;

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      aria-pressed={isSpeaking}
      aria-label={isSpeaking ? labels.stop : labels.listen}
    >
      <SpeakerIcon className={isSpeaking ? 'text-indigo-600 dark:text-indigo-400' : undefined} />
      <span>{isSpeaking ? labels.stop : labels.listen}</span>
    </button>
  );
}
