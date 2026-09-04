"""Offline document authoring only; not used by the website or its build."""

import json
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate


ROOT = Path(__file__).resolve().parents[1]
PROFILE = json.loads((ROOT / "src/data/portfolio.json").read_text(encoding="utf-8"))
OUTPUT = ROOT / "public/cv/ishan-academic-cv.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

INK = colors.HexColor("#172338")
MUTED = colors.HexColor("#526178")
BLUE = colors.HexColor("#334fce")


def clean(value):
    return escape(str(value).replace("\u2014", " - ").replace("\u2013", "-").replace("\u2019", "'").replace("\u2018", "'"))


styles = {
    "name": ParagraphStyle("Name", fontName="Helvetica-Bold", fontSize=28, leading=33, textColor=INK, spaceAfter=5),
    "subtitle": ParagraphStyle("Subtitle", fontName="Helvetica", fontSize=11, leading=16, textColor=BLUE, spaceAfter=6),
    "contact": ParagraphStyle("Contact", fontName="Helvetica", fontSize=9.5, leading=14, textColor=MUTED),
    "heading": ParagraphStyle("Heading", fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=BLUE, spaceBefore=16, spaceAfter=7, keepWithNext=True),
    "body": ParagraphStyle("Body", fontName="Helvetica", fontSize=10, leading=14, textColor=INK, spaceAfter=5, alignment=TA_LEFT),
    "detail": ParagraphStyle("Detail", fontName="Helvetica", fontSize=9.5, leading=13.5, textColor=MUTED, spaceAfter=5),
}


def paragraph(text, style="body"):
    return Paragraph(text, styles[style])


def section(title):
    return paragraph(title.upper(), "heading")


person = PROFILE["person"]
links = PROFILE["links"]
story = [
    paragraph(clean(person["name"]), "name"),
    paragraph("Year 13 student | Aspiring Computer Engineer", "subtitle"),
    paragraph(clean(person["location"]) + " | Expected graduation " + str(person["graduation"]), "contact"),
    paragraph('<a href="mailto:' + links["email"] + '">' + clean(links["email"]) + '</a> | <a href="' + links["github"] + '">GitHub: slightlyoverrated</a> | <a href="' + links["linkedin"] + '">LinkedIn</a>', "contact"),
    paragraph('<a href="' + links["site"] + '">' + clean(links["site"]) + '</a>', "contact"),
    section("Education"),
    paragraph("<b>" + clean(person["school"]) + "</b> | Thailand"),
    paragraph("Year 13 / A Level studies: " + clean(", ".join(person["subjects"])) + ".", "detail"),
    paragraph("<b>IGCSE:</b> Computer Science A. <b>SAT:</b> 1250 (Math 630; Reading &amp; Writing 620).", "detail"),
    paragraph("<b>Current AS:</b> Mathematics C, Physics D, Computer Science D. Physics and Computer Science retakes planned for October 2026; A2 study continues.", "detail"),
    section("Selected independent projects"),
]

cv_projects = [
    ("KRUNG", "Thailand-focused news and research platform", "Built a platform that connects storylines, summaries, and sources. Developed skills in information architecture, UI/UX, research design, accessibility, and deployment.", "https://krung.news"),
    ("OrderFlow", "Commerce product experiment", "Explored a complete product-to-order workflow for small businesses, including storefronts, checkout, and order management. Worked with Next.js, Supabase, authentication, and relational data.", None),
    ("Mitra", "Python desktop assistant experiment", "Explored reminders, audio interaction, and quick app launching through a custom desktop interface. Practised Python application structure and desktop UI design.", None),
]
for title, descriptor, description, url in cv_projects:
    name = '<a href="' + url + '">' + title + '</a>' if url else title
    story.append(KeepTogether([
        paragraph("<b>" + name + "</b> | " + clean(descriptor)),
        paragraph(clean(description), "detail"),
    ]))

story.append(section("Technical skills & foundations"))
for group in PROFILE["skills"]:
    story.append(paragraph("<b>" + clean(group["title"]) + ":</b> " + clean(", ".join(group["items"])) + ".", "detail"))

story.append(section("Academic highlights"))
story.extend([
    paragraph("<b>Best in Computer Science</b> - school award.", "detail"),
    paragraph("<b>7+ Perse Python competition certificates</b> - competitive programming and problem solving.", "detail"),
    paragraph("<b>Robotics Olympiad invitation</b> - invited to participate; not a competition result.", "detail"),
    section("Involvement & interests"),
    paragraph("<b>Ror Dor:</b> Thai Reserve Officer Training Corps student training; discipline, responsibility, and teamwork. <b>Independent exploration:</b> Arduino, electronics, and robotics.", "detail"),
    paragraph("Interested in computer engineering, AI, robotics, secure systems, and technology with practical value in Thailand.", "detail"),
])


def page_frame(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#DCE3ED"))
    canvas.line(44, 35, A4[0] - 44, 35)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(44, 23, "Ishan Dubey | Academic CV | September 2026")
    canvas.drawRightString(A4[0] - 44, 23, str(doc.page))
    canvas.restoreState()


document = SimpleDocTemplate(
    str(OUTPUT), pagesize=A4, rightMargin=44, leftMargin=44,
    topMargin=38, bottomMargin=48, title="Ishan Dubey - Academic CV",
    author=person["name"], subject="Academic background, projects, skills, and involvement",
)
document.build(story, onFirstPage=page_frame, onLaterPages=page_frame)
print(OUTPUT)
