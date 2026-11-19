import { FiDownload } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { useCoins } from "../../apis/user.api";

const DownloadBtn = ({ docRef, user, setUser }) => {
  const handlePdf = useReactToPrint({
    contentRef: docRef,
    documentTitle: "FresherAI-Resume",
    pageStyle: `
    @page {
      size: A4 portrait;
      margin: 0;
    }

    @media print {
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      #resume-print {
        width: 210mm !important;
        min-height: 0 !important;
        height: auto !important;
        margin: 0 !important;
        box-shadow: none !important;
        overflow: visible !important;
      }

      #resume-print,
      #resume-print * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `,
  });

  const handleDownload = async () => {
    try {
      const coinResponse = await useCoins({
        coins: 10,
        action: "download-pdf",
      });
      setUser((prev) => ({
        ...prev,
        interviewCoin: coinResponse?.interviewCoin,
      }));
      handlePdf();
    } catch (error) {
      if (error.response?.status === 403) {
        return alert("Not enough Interview Coins.");
      }
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };
  return (
    <button
      onClick={() => handleDownload()}
      className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-xs text-white"
    >
      <FiDownload />
      Download PDF
    </button>
  );
};

export default DownloadBtn;
