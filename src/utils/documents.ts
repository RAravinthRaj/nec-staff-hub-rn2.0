/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

export const ALLOWED_DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
] as const;

export const ALLOWED_DOCUMENT_EXTENSIONS = ["pdf", "png", "jpeg", "jpg"] as const;

export const getDocumentExtension = (value?: string) => {
  if (!value) {
    return "";
  }

  const cleanValue = value.split("?")[0].split("#")[0];
  return cleanValue.split(".").pop()?.toLowerCase() || "";
};

export const getDocumentMimeType = (fileName?: string, mimeType?: string) => {
  const normalizedMimeType = String(mimeType || "").toLowerCase();
  if (ALLOWED_DOCUMENT_MIME_TYPES.includes(normalizedMimeType as never)) {
    return normalizedMimeType;
  }

  const extension = getDocumentExtension(fileName);

  if (extension === "pdf") {
    return "application/pdf";
  }

  if (extension === "png") {
    return "image/png";
  }

  if (extension === "jpg" || extension === "jpeg") {
    return "image/jpeg";
  }

  return "";
};

export const isAllowedDocumentType = (fileName?: string, mimeType?: string) => {
  const extension = getDocumentExtension(fileName);
  const normalizedMimeType = String(mimeType || "").toLowerCase();

  return (
    ALLOWED_DOCUMENT_EXTENSIONS.includes(extension as never) ||
    ALLOWED_DOCUMENT_MIME_TYPES.includes(normalizedMimeType as never)
  );
};

const normalizeStringArray = (items: unknown[]): string[] => {
  return items
    .flatMap((item) => {
      const value = typeof item === "string" ? item : String(item ?? "");
      const trimmed = value.trim();

      if (
        trimmed.startsWith("data:") ||
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("file://")
      ) {
        return [trimmed];
      }

      return value.split(",");
    })
    .map((item) => item.trim())
    .filter(Boolean);
};

export const normalizeDocuments = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return normalizeStringArray(value);
  }

  if (value == null) {
    return [];
  }

  if (typeof value !== "string") {
    return normalizeStringArray([value]);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return [];
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return normalizeStringArray(parsed);
    }

    if (typeof parsed === "string") {
      return normalizeStringArray([parsed]);
    }
  } catch (_) {
    return normalizeStringArray([trimmed]);
  }

  return normalizeStringArray([trimmed]);
};
