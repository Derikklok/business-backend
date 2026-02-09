import { DocumentCounter } from "../models/DocumentCounter";

const COUNTRY_CODE = "sl";

const TYPE_MAP: Record<string, string> = {
  invoice: "",
  estimate: "est",
  purchase_order: "po",
  rental_proposal: "rp",
};

export const generateDocumentNo = async (
  documentType: string
): Promise<string> => {
  const year = new Date().getFullYear();

  // Atomic increment - counter must exist
  let counter = await DocumentCounter.findOneAndUpdate(
    {
      documentType,
      year,
    },
    {
      $inc: { seq: 1 },
    },
    {
      new: true,
    }
  );

  // If counter doesn't exist, create it
  if (!counter) {
    counter = await DocumentCounter.create({
      documentType,
      year,
      seq: 61, // Start from 61 (60 + 1 increment)
    });
  }

  const numberPart = String(counter.seq).padStart(3, "0");

  const typePart = TYPE_MAP[documentType] ?? "";

  return `${numberPart}${COUNTRY_CODE}${typePart}${year}`;
};
