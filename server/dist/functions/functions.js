"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMimeType = getMimeType;
function getMimeType(extension) {
    switch (extension) {
        case ".jpg":
        case ".jpeg":
            return "image/jpeg";
        case ".png":
            return "image/png";
        case ".gif":
            return "image/gif";
        case ".bmp":
            return "image/bmp";
        case ".webp":
            return "image/webp";
        default:
            return "application/octet-stream";
    }
}
//# sourceMappingURL=functions.js.map