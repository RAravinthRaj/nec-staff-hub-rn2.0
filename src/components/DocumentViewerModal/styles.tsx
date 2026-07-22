import { StyleSheet } from "react-native";
import { Fonts } from "@/assets";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 44,
  },
  container: {
    width: "100%",
    maxHeight: "78%",
    borderRadius: 18,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
    gap: 12,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  headerTextBlock: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    opacity: 0.7,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  previewContainer: {
    minHeight: 280,
    maxHeight: 420,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  previewPdf: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 10,
  },
  fallbackTitle: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
    textAlign: "center",
  },
  fallbackText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 18,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
  },
});
