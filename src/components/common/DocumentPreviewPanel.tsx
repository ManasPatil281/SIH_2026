import React, { useRef } from 'react';
import { FileText, UploadCloud, ScanLine, ShieldCheck, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { DocumentItem } from '../../types';

interface DocumentPreviewPanelProps {
  document: DocumentItem;
  onFileSelected?: (fileName: string) => void;
  uploadedFileName?: string;
  compact?: boolean;
}

export const DocumentPreviewPanel: React.FC<DocumentPreviewPanelProps> = ({
  document,
  onFileSelected,
  uploadedFileName,
  compact = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const displayFileName = uploadedFileName || document.fileName;

  return (
    <section className={`rounded-xl border border-slate-200 bg-slate-50/70 ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700">
            <FileText className="w-3.5 h-3.5" />
            PDF document preview
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Mock evidence file for this controlled case study · page 1 of 3
          </p>
        </div>
        {onFileSelected && (
          <>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onFileSelected(file.name);
              }}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-2.5 py-1.5 bg-white border border-slate-300 hover:border-teal-500 text-slate-700 rounded-lg text-[11px] font-semibold flex items-center gap-1.5"
            >
              <UploadCloud className="w-3.5 h-3.5 text-teal-700" />
              Replace preview
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1.35fr)] gap-3">
        <div className="rounded-lg border border-slate-300 bg-slate-200 overflow-hidden shadow-inner">
          <div className="h-8 bg-[#263238] text-slate-100 px-2.5 flex items-center justify-between text-[10px]">
            <span className="font-mono truncate max-w-[65%]">{displayFileName}</span>
            <div className="flex items-center gap-2 text-slate-300">
              <ZoomIn className="w-3 h-3" />
              <span>100%</span>
              <span className="text-slate-500">|</span>
              <span>PDF</span>
            </div>
          </div>
          <div className="p-3 min-h-[285px] flex justify-center">
            <div className="w-full max-w-[310px] min-h-[265px] rounded-sm bg-white border border-slate-300 shadow-md p-4 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded bg-[#0F294A] text-white flex items-center justify-center text-[10px] font-bold">BSIET</div>
                <div>
                  <div className="text-[10px] font-bold text-slate-900 uppercase">Dr. Bapuji Salunkhe Institute</div>
                  <div className="text-[9px] text-slate-500">Kolhapur, Maharashtra · Synthetic test evidence</div>
                </div>
              </div>
              <div className="text-[11px] font-bold text-slate-800 border-b border-slate-300 pb-2 mb-2">
                {document.title}
              </div>
              <div className="text-[9px] text-slate-500 mb-2">
                Document type: {document.documentType} · Page 1 of 3
              </div>
              <div className="border border-slate-200 rounded overflow-hidden mb-2">
                {document.ocrExtractedFields.slice(0, 4).map((field) => (
                  <div key={field.label} className="grid grid-cols-[42%_58%] border-b last:border-b-0 border-slate-100 px-2 py-1.5">
                    <span className="text-[9px] font-semibold text-slate-500">{field.label}</span>
                    <span className="text-[9px] font-bold text-slate-800 break-words">{field.extractedValue}</span>
                  </div>
                ))}
              </div>
              <div className="text-[9px] leading-relaxed text-slate-600 border-t border-slate-200 pt-2 pr-1">
                Evidence submitted for application scrutiny and comparison against the cited handbook requirement.
              </div>
              <div className="absolute bottom-3 right-3 text-[9px] font-bold text-amber-700 border border-amber-300 bg-amber-50 px-1.5 py-0.5 rounded">
                MOCK DOCUMENT
              </div>
            </div>
          </div>
          <div className="h-7 bg-white border-t border-slate-300 px-2 flex items-center justify-between text-[10px] text-slate-500">
            <button type="button" className="flex items-center gap-0.5 hover:text-slate-900"><ChevronLeft className="w-3 h-3" />Prev</button>
            <span>1 / 3</span>
            <button type="button" className="flex items-center gap-0.5 hover:text-slate-900">Next<ChevronRight className="w-3 h-3" /></button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="font-semibold text-xs text-slate-900 truncate">{document.title}</div>
              <div className="text-[10px] text-slate-500 font-mono truncate mt-0.5">{displayFileName} · {document.fileSize}</div>
            </div>
            <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
              {document.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-600">
            <ScanLine className="w-3.5 h-3.5 text-indigo-600" />
            OCR fields ready for comparison
          </div>
          <div className="space-y-1.5">
            {document.ocrExtractedFields.slice(0, compact ? 2 : 4).map((field) => (
              <div key={field.label} className="flex items-center justify-between gap-2 text-[10px] border-b border-slate-100 pb-1.5">
                <span className="text-slate-500 truncate">{field.label}</span>
                <span className="font-semibold text-slate-800 truncate max-w-[55%]">{field.extractedValue}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 pt-1 text-[10px] text-emerald-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Human verification remains required
          </div>
        </div>
      </div>
    </section>
  );
};
