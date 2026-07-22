import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@rneui/themed";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import Pdf from "react-native-pdf";
import { styles as S } from "./styles";
import { getDocumentExtension, getDocumentMimeType } from "@/utils/documents";
import { showToast } from "@/utils";

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg"];

const isImageFile = (value?: string) => IMAGE_EXTENSIONS.includes(getDocumentExtension(value));

export const getDocumentFileName = (documentUrl: string, index: number) =>
  decodeURIComponent(documentUrl?.split("/").pop()?.split("?")[0] || "").replace(
    /^\d+-[a-z0-9]+-/,
    "",
  ) || `Document ${index + 1}`;

export interface DocumentViewerModalProps {
  visible: boolean;
  documentUrl?: string | null;
  fileName?: string | null;
  onClose: () => void;
}

export const DocumentViewerModal = ({
  visible,
  documentUrl,
  fileName,
  onClose,
}: DocumentViewerModalProps) => {
  const { theme } = useTheme();
  const colors: any = theme.colors;
  const [loading, setLoading] = useState(false);
  const [hasPreviewError, setHasPreviewError] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const resolvedFileName = fileName || "Document";
  const canPreviewAsImage = isImageFile(resolvedFileName) || isImageFile(documentUrl || "");
  const canPreviewAsPdf =
    getDocumentExtension(resolvedFileName) === "pdf" ||
    getDocumentExtension(documentUrl || "") === "pdf";

  useEffect(() => {
    if (!visible) {
      setLoading(false);
      setHasPreviewError(false);
      setDownloadLoading(false);
    }
  }, [visible, documentUrl]);

  const handleDownload = async () => {
    if (!documentUrl) {
      return;
    }

    try {
      setDownloadLoading(true);
      const extension = getDocumentExtension(resolvedFileName) || "bin";
      const sanitizedName = resolvedFileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const downloadUri = `${FileSystem.documentDirectory || FileSystem.cacheDirectory}${Date.now()}-${sanitizedName || `document.${extension}`}`;

      await FileSystem.downloadAsync(documentUrl, downloadUri);

      const mimeType = getDocumentMimeType(resolvedFileName);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(downloadUri, {
          mimeType: mimeType || undefined,
          dialogTitle: "Download document",
          UTI: extension === "pdf" ? "com.adobe.pdf" : undefined,
        });
        showToast("Document ready to save or share", "success");
      } else {
        showToast("Document downloaded in app storage", "success");
      }
    } catch (error) {
      showToast("Unable to download document", "error");
    } finally {
      setDownloadLoading(false);
    }
  };

  const renderFallback = () => (
    <View
      style={[
        S.fallbackContainer,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Text style={[S.fallbackTitle, { color: colors.black }]}>
        Preview is not available right now.
      </Text>
      <Text style={[S.fallbackText, { color: colors.black }]}>
        This file could not be rendered inside the app on this device.
      </Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={S.overlay}>
        <View style={[S.container, { backgroundColor: colors.white }]}>
          <View style={S.header}>
            <View style={S.headerTopRow}>
              <View style={S.headerTextBlock}>
                <Text style={[S.title, { color: colors.black }]}>
                  {resolvedFileName}
                </Text>
                <Text style={[S.subtitle, { color: colors.black }]}>
                  Previewing uploaded leave document
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  S.iconButton,
                  {
                    backgroundColor: colors.background,
                    opacity: downloadLoading ? 0.7 : 1,
                  },
                ]}
                activeOpacity={0.8}
                onPress={handleDownload}
                disabled={downloadLoading || !documentUrl}
              >
                {downloadLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <Icon name="download" size={22} color={colors.primary} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={S.previewContainer}>
            {documentUrl ? (
              canPreviewAsImage ? (
                <>
                  {!hasPreviewError ? (
                    <Image
                      source={{ uri: documentUrl }}
                      style={S.previewImage}
                      resizeMode="contain"
                      onLoadStart={() => {
                        setLoading(true);
                        setHasPreviewError(false);
                      }}
                      onLoadEnd={() => setLoading(false)}
                      onError={() => {
                        setLoading(false);
                        setHasPreviewError(true);
                      }}
                    />
                  ) : (
                    renderFallback()
                  )}
                </>
              ) : canPreviewAsPdf ? (
                hasPreviewError ? (
                  renderFallback()
                ) : (
                  <Pdf
                    source={{ uri: documentUrl, cache: true }}
                    style={S.previewPdf}
                    trustAllCerts={false}
                    onLoadProgress={() => {
                      setLoading(true);
                      setHasPreviewError(false);
                    }}
                    onLoadComplete={() => setLoading(false)}
                    onError={() => {
                      setLoading(false);
                      setHasPreviewError(true);
                    }}
                  />
                )
              ) : hasPreviewError ? (
                renderFallback()
              ) : (
                <WebView
                  source={{
                    uri: `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(
                      documentUrl,
                    )}`,
                  }}
                  originWhitelist={["*"]}
                  javaScriptEnabled
                  startInLoadingState
                  setSupportMultipleWindows={false}
                  onLoadStart={() => {
                    setLoading(true);
                    setHasPreviewError(false);
                  }}
                  onLoadEnd={() => setLoading(false)}
                  onError={() => {
                    setLoading(false);
                    setHasPreviewError(true);
                  }}
                  renderLoading={() => (
                    <View style={S.loaderOverlay}>
                      <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                  )}
                />
              )
            ) : (
              renderFallback()
            )}

            {loading ? (
              <View style={S.loaderOverlay}>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : null}
          </View>

          <View style={S.footer}>
            <TouchableOpacity
              style={[S.button, { backgroundColor: colors.primary }]}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={[S.buttonText, { color: colors.white }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
