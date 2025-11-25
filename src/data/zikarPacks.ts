import type { Zikar } from "@/components/ZikarSelector";

export const COMMON_ZIKAR: Zikar[] = [
  {
    id: "subhanallah",
    name: "SubhanAllah",
    arabic: "سُبْحَانَ ٱللَّٰهِ",
    transliteration: "Glory be to Allah",
    defaultTarget: 33,
  },
  {
    id: "alhamdulillah",
    name: "Alhamdulillah",
    arabic: "ٱلْحَمْدُ لِلَّٰهِ",
    transliteration: "All praise is due to Allah",
    defaultTarget: 33,
  },
  {
    id: "allahuakbar",
    name: "Allahu Akbar",
    arabic: "ٱللَّٰهُ أَكْبَرُ",
    transliteration: "Allah is the Greatest",
    defaultTarget: 34,
  },
  {
    id: "lailahaillallah",
    name: "La ilaha illallah",
    arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ",
    transliteration: "There is no god but Allah",
    defaultTarget: 100,
  },
  {
    id: "astaghfirullah",
    name: "Astaghfirullah",
    arabic: "أَسْتَغْفِرُ ٱللَّٰهَ",
    transliteration: "I seek forgiveness from Allah",
    defaultTarget: 100,
  },
];

export const DUAS: Zikar[] = [
  {
    id: "dua-jannah",
    name: "Dua for Jannah",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    transliteration: "Our Lord, give us good in this world and good in the Hereafter",
    defaultTarget: 7,
  },
  {
    id: "dua-forgiveness",
    name: "Dua for Forgiveness",
    arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي",
    transliteration: "My Lord, forgive me and have mercy upon me",
    defaultTarget: 10,
  },
  {
    id: "dua-guidance",
    name: "Dua for Guidance",
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
    transliteration: "Our Lord, let not our hearts deviate after You have guided us",
    defaultTarget: 7,
  },
  {
    id: "dua-patience",
    name: "Dua for Patience",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ",
    transliteration: "Our Lord, pour upon us patience and let us die as Muslims",
    defaultTarget: 7,
  },
  {
    id: "dua-protection",
    name: "Dua for Protection",
    arabic: "أَعُوذُ بِاللَّٰهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    transliteration: "I seek refuge in Allah from Satan, the expelled",
    defaultTarget: 3,
  },
  {
    id: "dua-knowledge",
    name: "Dua for Knowledge",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "My Lord, increase me in knowledge",
    defaultTarget: 10,
  },
];

export const DAROODS: Zikar[] = [
  {
    id: "darood-ibrahim",
    name: "Darood Ibrahim",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
    transliteration: "O Allah, send prayers upon Muhammad and the family of Muhammad",
    defaultTarget: 10,
  },
  {
    id: "darood-simple",
    name: "Simple Darood",
    arabic: "صَلَّى اللَّٰهُ عَلَيْهِ وَسَلَّمَ",
    transliteration: "May Allah honor him and grant him peace",
    defaultTarget: 100,
  },
  {
    id: "darood-complete",
    name: "Complete Darood Ibrahim",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    transliteration: "O Allah, send prayers upon Muhammad and his family as You sent prayers upon Ibrahim",
    defaultTarget: 11,
  },
  {
    id: "darood-tasleem",
    name: "Darood with Tasleem",
    arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
    transliteration: "O Allah, send prayers and peace upon our Prophet Muhammad",
    defaultTarget: 10,
  },
  {
    id: "darood-lakhs",
    name: "Darood Lakhs",
    arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ",
    transliteration: "O Allah, send blessings upon our Master Muhammad",
    defaultTarget: 1000,
  },
];

export type ZikarPackType = "common" | "duas" | "daroods" | "custom";

export interface ZikarPack {
  id: ZikarPackType;
  name: string;
  description: string;
  icon: string;
  items: Zikar[];
}

export const getZikarPacks = (customZikars: Zikar[]): ZikarPack[] => [
  {
    id: "common",
    name: "Common Zikr",
    description: "Daily remembrance phrases",
    icon: "🕌",
    items: COMMON_ZIKAR,
  },
  {
    id: "duas",
    name: "Duas",
    description: "Supplications from Quran & Hadith",
    icon: "🤲",
    items: DUAS,
  },
  {
    id: "daroods",
    name: "Daroods",
    description: "Blessings upon Prophet Muhammad ﷺ",
    icon: "☪️",
    items: DAROODS,
  },
  {
    id: "custom",
    name: "Custom",
    description: "Your personal Zikr collection",
    icon: "✨",
    items: customZikars,
  },
];
