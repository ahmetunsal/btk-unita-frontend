"use client";

import Loading from "@/components/other/Loading";
import CollapsibleMap from "@/components/results/Why";
import React, { useEffect, useState } from "react";
import axios from "axios";

/*

data: {
    recommendations: { hedef: [Array], gercekci: [Array], guvenli: [Array] },
    summary: 'Öğrenci profiliniz, Sayısal (SAY) puan türündeki sıralamanız ve detaylı ilgi alanlarınız doğrultusunda oldukça net bir kariyer vizyonuna sahip olduğunuzu gösteriyor. Matematik ve sayısal analiz, fen bilimleri ve bilişim teknolojilerine olan ilginiz, Bilgisayar Mühendisliği ve Yazılım Mühendisliği gibi alanlarda sizi çok başarılı kılacaktır. Hızlıca iş hayatına atılma, yurt dışı kariyer imkanları ve esnek çalışma saatleri gibi hedefleriniz, özellikle bilişim sektörünün sunduğu fırsatlarla birebir örtüşmektedir. Ayrıca, mesleki saygınlık, bireysel bağımsızlık ve yüksek gelir beklentileriniz de bu alanlardaki başarı potansiyelinizi desteklemektedir. Büyükşehir (İstanbul, Ankara, İzmir) ve devlet üniversitesi tercihiniz de önerilerimizin ana çerçevesini oluşturmuştur. Kampüs yaşamına verdiğiniz önem ve detay odaklı çalışma tercihiniz, seçilecek bölüm ve üniversitenin size uygunluğunu artıracaktır.',
    strategy: "Tercih listenizi oluştururken, 'Hedef' kategorisindeki üniversiteleri ilk sıralara koyarak hayallerinizdeki bölümlere ulaşma şansınızı deneyebilirsiniz. Ardından, 'Gerçekçi' seçenekleri mevcut sıralamanıza en uygun ve güçlü alternatifler olarak değerlendirmelisiniz. 'Güvenli' seçenekler ise, listenizin sonlarına ekleyerek açıkta kalma riskinizi minimize etmenizi sağlayacaktır. Özellikle İngilizce eğitim veren bölümleri tercih etmeniz, yurt dışı kariyer hedefleriniz için büyük bir avantaj sağlayacaktır. Üniversitelerin ders programlarını, Erasmus/Değişim programı imkanlarını ve araştırma alanlarını detaylıca incelemeniz önemlidir. Tercih döneminde sıralamaların önceki yıllara göre küçük sapmalar gösterebileceğini unutmayın ve son verilere göre tercih listenizi şekillendirin. Kampüs imkanları ve sosyal ortamın sizin için önemli olması nedeniyle, mümkünse bu üniversitelerin kampüslerini ziyaret etmeye çalışın veya online tanıtımlarını takip edin. Seçimlerinizde esneklik ve yeniliğe açık olmanız, bilişim sektörünün dinamik yapısına kolayca adapte olmanızı sağlayacaktır."
  },
  meta: {
    totalUniversitiesConsidered: 0,
    userPreferences: {
      programType: 'SAY',
      aytSuccessRanking: 189235,
      rankingRanges: [Object],
      cityPreference: 'Büyükşehir (İstanbul, Ankara, İzmir)',
      universityTypePreference: [Array],
      selectedCourses: [Array],
      careerGoals: [Array]
    },
    rankingAnalysis: {
      inputRanking: 189235,
      ranges: [Object],
      universityCounts: [Object]
    }
  }
}

*/

interface IUniversity {
  programCode: string;
  university: string;
  department: string;
  city: string;
  matchScore: number;
  requiredRanking: string;
  careerOpportunities: string[];
  advantages: string[];
  reason: string[];
}

type SurveyResults = {
  recommendations: IUniversity[];
  summary: string;
  strategy: string;
};

const SurveyResults = () => {
  const [data, setData] = useState<SurveyResults | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("uniqueId");
      try {
        const response = await axios.post("/api/survey/results", {
          uniqueId: id,
        });
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        console.log("Survey results:", response.data.questions.recommendations);
        setData(response.data.questions.recommendations);
      } catch (error) {
        console.error("Failed to fetch survey results:", error);
      }
    };

    fetchData();
  }, []);

  const matchColor = (score: number) => {
    if (score > 80) return "bg-green-500";
    if (score > 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex">
        {data ? (
          <div className="w-full flex flex-col items-center justify-center p-5 rounded-lg shadow-md">
            <div className="flex flex-col gap-5 items-center py-20">
              <h1 className="text-2xl md:text-4xl font-bold">
                Anket Sonuçları
              </h1>
              <span className="text-sm text-gray-400">
                *Sonuçlar Gemini&apos;nin önerileriyle oluşturulmuştur.
              </span>
            </div>
            <div className="w-full flex flex-col gap-4 items-center justify-center">
              <div className="w-full md:w-1/2 p-4 bg-zinc-900 rounded-md text-justify flex flex-col gap-2">
                <h2 className="text-gray-200 text-lg font-semibold">Özet</h2>
                {data.summary && (
                  <span className="text-sm text-gray-200">{data.summary}</span>
                )}
              </div>
              <ul className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                {data.recommendations.map((r, i) => {
                  return (
                    <div
                      className="col-span-2 flex flex-col gap-2 bg-zinc-900 p-2 rounded-md"
                      key={i}
                    >
                      <div className="flex">
                        <span
                          className={`w-fit rounded-full px-2 ${matchColor(
                            r.matchScore * 100
                          )}`}
                        >
                          {r.matchScore * 100}% Uyum
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex gap-2">
                          <h2 className="text-xl">
                            {r.university} ÜNİVERSİTESİ
                          </h2>
                        </div>
                        <div className="flex items-center justify-between gap-2 text-gray-400 text-sm">
                          <span>{r.city}</span> -<span>{r.programCode}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 text-xl">
                        <span className="">{r.department}</span>
                      </div>
                      <hr />
                      <div className="flex flex-col gap-2">
                        <CollapsibleMap title="Neden Bu Bölüm?" array={r.reason} />
                        <CollapsibleMap title="Avantajlar" array={r.advantages} />
                        <CollapsibleMap title="Kariyer Fırsatları" array={r.careerOpportunities} />
                      </div>
                    </div>
                  );
                })}
              </ul>
              <div className="flex flex-col gap-2 w-full text-justify md:w-1/2 p-4 bg-zinc-900 rounded-md">
                <h2 className="text-lg font-semibold">
                  Gemini&apos;nin önerdiği strateji
                </h2>
                {data.strategy && (
                  <span className="text-sm text-gray-200">{data.strategy}</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default SurveyResults;
