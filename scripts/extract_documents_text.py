from __future__ import annotations

from pathlib import Path

from pypdf import PdfReader


def extract_pdf_text(pdf_path: Path) -> str:
    reader = PdfReader(str(pdf_path))
    parts: list[str] = []
    for page in reader.pages:
        parts.append(page.extract_text() or "")
    return "\n\n".join(parts).strip()


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    documents_dir = repo_root / "documents"
    out_dir = documents_dir / "extracted"
    out_dir.mkdir(parents=True, exist_ok=True)

    pdfs = sorted(documents_dir.glob("*.pdf"))
    if not pdfs:
        raise SystemExit("No PDFs found in documents/")

    for pdf in pdfs:
        text = extract_pdf_text(pdf)
        out = out_dir / f"{pdf.stem}.txt"
        out.write_text(text, encoding="utf-8")
        print(f"Wrote {out} ({len(text)} chars)")


if __name__ == "__main__":
    main()

