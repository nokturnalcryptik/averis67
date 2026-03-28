from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'prova_clone')]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ─── Models ───────────────────────────────────────────────

class Group(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    logo_url: str

class Stat(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    label: str
    value: float
    suffix: str
    is_decimal: bool = False

class CaseItem(BaseModel):
    avatar: str
    title: str
    assignee: str
    status: str
    status_color: str

class FeaturesResponse(BaseModel):
    tabs: List[str]
    case_items: List[CaseItem]
    case_tags: List[str]

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    text: str
    name: str
    initials: str
    role: str
    group_name: str

class PricingPlan(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: str
    price_subtext: Optional[str] = None
    popular: bool = False
    features: List[str]
    cta: str
    cta_link: Optional[str] = None

class FAQItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question: str
    answer: str

class GuideArticle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    author: str
    author_initials: str
    read_time: str
    link: str

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

class ContactResponse(BaseModel):
    success: bool
    id: str

class WaitlistRequest(BaseModel):
    prompt: str

class WaitlistResponse(BaseModel):
    success: bool
    id: str

# ─── Seed Data ────────────────────────────────────────────

SEED_GROUPS = [
    {"name": "Healthyn", "logo_url": "https://tr.rbxcdn.com/180DAY-fdfcf132f10dd1698b2cd1dc832f82b2/150/150/Image/Png/noFilter"},
    {"name": "Roy & Charcle", "logo_url": "https://tr.rbxcdn.com/180DAY-de92af62d31468f533021fb51a7f27fb/150/150/Image/Png/noFilter"},
    {"name": "Greenwood Shopping", "logo_url": "https://tr.rbxcdn.com/180DAY-b8e1dc9c2e46b455c8a841740fdeae7f/150/150/Image/Png/noFilter"},
    {"name": "Shake House Corporation", "logo_url": "https://tr.rbxcdn.com/180DAY-971bedbf508af1caa1f2c80fde272c16/150/150/Image/Png/noFilter"},
    {"name": "Panyé", "logo_url": "https://tr.rbxcdn.com/180DAY-abff0fbb63bfb215fe49d664dd292ed9/150/150/Image/Png/noFilter"},
    {"name": "Prova Official", "logo_url": "https://tr.rbxcdn.com/180DAY-6e99e00bc7d6b6a0f96987723aa43886/150/150/Image/Png/noFilter"},
    {"name": "Roblox Wiki", "logo_url": "https://tr.rbxcdn.com/180DAY-0f65f9837f2fc16066b49e6987bd63f9/150/150/Image/Png/noFilter"},
    {"name": "Blyx", "logo_url": "https://tr.rbxcdn.com/180DAY-396dbd2df81aec520ac844e0be21b37d/150/150/Image/Png/noFilter"},
    {"name": "BloxStreet Corporation", "logo_url": "https://tr.rbxcdn.com/180DAY-39e9b18a317f524eb1456f60f5c10d9a/150/150/Image/Png/noFilter"},
    {"name": "ServiGames", "logo_url": "https://tr.rbxcdn.com/180DAY-0a2e2a8619b39e74209683c997ad7ad7/150/150/Image/Png/noFilter"},
    {"name": "Ristorante roleplay group", "logo_url": "https://tr.rbxcdn.com/180DAY-af685dfd424e1176a2859946352a96d3/150/150/Image/Png/noFilter"},
    {"name": "Roblox Operations: Siege", "logo_url": "https://tr.rbxcdn.com/180DAY-71cf88db249f45f55662910c7537086f/150/150/Image/Png/noFilter"},
]

SEED_STATS = [
    {"label": "Cases handled", "value": 16905557, "suffix": "+", "is_decimal": False},
    {"label": "Active staff", "value": 845278, "suffix": "+", "is_decimal": False},
    {"label": "Groups using Prova", "value": 169055, "suffix": "+", "is_decimal": False},
    {"label": "Uptime", "value": 99.9, "suffix": "%", "is_decimal": True},
]

SEED_FEATURE_TABS = ["Cases", "Sessions", "Activity", "Rankings", "Staff", "ProvAI", "Webhooks", "Security", "Notices"]

SEED_CASE_ITEMS = [
    {"avatar": "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-478F6602681D9B14D82BA84AA827BF76-Png/150/150/AvatarHeadshot/Png/noFilter", "title": "Exploit report in lobby", "assignee": "nullpagee", "status": "Open", "status_color": "#EF4444"},
    {"avatar": "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-85FD8CA98781F0297E0BCA15C8A4B625-Png/150/150/AvatarHeadshot/Png/noFilter", "title": "Harassment appeal #194", "assignee": "thistleaa", "status": "Review", "status_color": "#F59E0B"},
    {"avatar": "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-C2B0A734CB167BCA414E032AD6E6A0C8-Png/150/150/AvatarHeadshot/Png/noFilter", "title": "Scam attempt logs", "assignee": "exppireed", "status": "Resolved", "status_color": "#10B981"},
]

SEED_CASE_TAGS = ["Evidence uploads", "Assignments", "Timeline", "Tags", "Export"]

SEED_TESTIMONIALS = [
    {"text": "Prova transformed how we handle moderation. Our staff is more organized and accountable than ever. We can now track all moderation actions with full documentation.", "name": "expired", "initials": "EX", "role": "Owner", "group_name": "Healthyn"},
    {"text": "Prova has made managing our community significantly easier. Its automated moderation tools reduced the amount of manual work our staff had to do, and the logging features helped us track issues quickly and accurately. The system keeps everything organized, improves response times, and makes daily management far more efficient.", "name": "ダリヤ", "initials": "GA", "role": "Group Manager", "group_name": "Apollo"},
    {"text": "Using Prova has completely changed the way we manage our Roblox group. Our moderators are more coordinated, and the platform's logging and tracking tools are better than any alternative. Tasks that used to take hours now take minutes, and it's so much easier to see exactly what's happening in the community at any moment. Honestly, I don't know how we managed moderation before Prova.", "name": "pagee", "initials": "NU", "role": "Co Owner", "group_name": "Kelva"},
    {"text": "Prova is the most qualified Roblox group management platform. It is a lifesaver for so many people working in a group, as it handles all the hard work, so that you only focus on what matters most. I definitely recommend it!", "name": "stockmvrket", "initials": "ST", "role": "Owner", "group_name": "Movó"},
    {"text": "Prova has significantly improved the way we do things at Aquatic Views. Before, we had to go through shuffling through chats, looking at ticket transcripts, constantly having to double check everything was logged on our communications app. However, Prova has helped Aquatic Views. It went from being messy and unorganized to clean and smooth operations, thanks to Prova!", "name": "SimplYuii", "initials": "SI", "role": "Chief Administrative Officer", "group_name": "Aquatic Views"},
    {"text": "Prova has made moderating our group so much smoother. The interface is intuitive, and having every action logged automatically gives me peace of mind that nothing gets missed. Our team communicates better, issues are resolved faster, and overall, running the community feels far less stressful. It's honestly a game-changer for anyone serious about keeping their group safe and organized.", "name": "thistleaa", "initials": "TH", "role": "Manager", "group_name": "Blyx"},
]

SEED_PRICING = [
    {"name": "Starter", "description": "Everything a small group needs to get organized.", "price": "Free", "price_subtext": None, "popular": False, "features": ["25 cases per workspace", "200 staff members", "500MB file storage", "Discord webhooks", "7-day history", "Custom priority names", "Advanced permissions", "Clean webhooks"], "cta": "Get Started", "cta_link": "#"},
    {"name": "Pro", "description": "For groups that need more power and control.", "price": "299 R$", "price_subtext": "Paid through Roblox", "popular": True, "features": ["1,000 cases", "5,000 staff members", "3GB file storage", "Full history", "Custom priority names", "Role-based permissions", "Clean webhooks", "Priority support"], "cta": "Go Pro", "cta_link": "#"},
    {"name": "Enterprise", "description": "For large organizations with special needs.", "price": "Custom", "price_subtext": None, "popular": False, "features": ["Everything in Pro", "Unlimited workspaces", "Custom integrations", "Dedicated support", "SLA guarantee", "Custom branding"], "cta": "Coming Soon", "cta_link": None},
]

SEED_FAQ = [
    {"question": "What is Prova?", "answer": "Prova is an all-in-one platform for Roblox groups that helps you manage cases, staff, sessions, rankings, and more — all in one place."},
    {"question": "Is it actually free?", "answer": "Yes! The Starter plan is completely free and includes everything a small group needs. No credit card required."},
    {"question": "How does staff syncing work?", "answer": "Prova automatically syncs your group's roles and ranks from Roblox, so your staff list is always up to date."},
    {"question": "Can I send alerts to Discord?", "answer": "Absolutely. Prova supports Discord webhooks so you can get notifications for cases, sessions, and other events directly in your server."},
    {"question": "Is my data safe?", "answer": "Your data is encrypted at rest and in transit. Each workspace is fully isolated, and every action is logged for accountability."},
    {"question": "Can people appeal their bans?", "answer": "Yes. Prova has a built-in appeals system that lets banned users submit appeals, which your staff can review and respond to."},
    {"question": "How do I pay for Pro?", "answer": "Pro is paid through Roblox using Robux. No external payment processing needed."},
    {"question": "Can I switch plans?", "answer": "Yes, you can upgrade or downgrade at any time from your workspace settings."},
]

SEED_GUIDES = [
    {"title": "Advanced Webhook Configurations", "excerpt": "Go beyond basic Discord notifications with advanced webhook setups for power users.", "author": "nullpagee", "author_initials": "NU", "read_time": "2 min", "link": "#"},
    {"title": "Scaling Your Moderation Team", "excerpt": "As your Roblox group grows, your moderation needs evolve. Here's how to scale effectively with Prova.", "author": "nullpagee", "author_initials": "NU", "read_time": "2 min", "link": "#"},
    {"title": "Migrating from Spreadsheets to Prova", "excerpt": "If your group currently uses Google Sheets or Excel to track moderation cases, here's how to transition smoothly.", "author": "nullpagee", "author_initials": "NU", "read_time": "2 min", "link": "#"},
    {"title": "Creating Custom Roles & Permissions", "excerpt": "Custom roles allow you to define exactly what each staff member can do within your Prova workspace.", "author": "nullpagee", "author_initials": "NU", "read_time": "2 min", "link": "#"},
]

# ─── Seed on Startup ──────────────────────────────────────

async def seed_collection(collection_name, data, id_field="name"):
    collection = db[collection_name]
    count = await collection.count_documents({})
    if count == 0:
        docs = []
        for item in data:
            doc = {"id": str(uuid.uuid4()), **item}
            docs.append(doc)
        if docs:
            await collection.insert_many(docs)
            logger.info(f"Seeded {len(docs)} documents into {collection_name}")

@app.on_event("startup")
async def startup_db():
    await seed_collection("groups", SEED_GROUPS)
    await seed_collection("stats", SEED_STATS)
    await seed_collection("testimonials", SEED_TESTIMONIALS)
    await seed_collection("pricing", SEED_PRICING)
    await seed_collection("faq", SEED_FAQ)
    await seed_collection("guides", SEED_GUIDES)
    # Seed features as a single config document
    features_count = await db.features.count_documents({})
    if features_count == 0:
        await db.features.insert_one({
            "tabs": SEED_FEATURE_TABS,
            "case_items": SEED_CASE_ITEMS,
            "case_tags": SEED_CASE_TAGS,
        })
        logger.info("Seeded features config")

# ─── Routes ───────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Prova Clone API"}

@api_router.get("/groups")
async def get_groups():
    groups = await db.groups.find({}, {"_id": 0}).to_list(100)
    return {"groups": groups}

@api_router.get("/stats")
async def get_stats():
    stats = await db.stats.find({}, {"_id": 0}).to_list(10)
    return {"stats": stats}

@api_router.get("/features")
async def get_features():
    config = await db.features.find_one({}, {"_id": 0})
    if not config:
        return {"tabs": SEED_FEATURE_TABS, "case_items": SEED_CASE_ITEMS, "case_tags": SEED_CASE_TAGS}
    return config

@api_router.get("/testimonials")
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(50)
    return {"testimonials": testimonials}

@api_router.get("/pricing")
async def get_pricing():
    plans = await db.pricing.find({}, {"_id": 0}).to_list(10)
    return {"plans": plans}

@api_router.get("/faq")
async def get_faq():
    items = await db.faq.find({}, {"_id": 0}).to_list(50)
    return {"items": items}

@api_router.get("/guides")
async def get_guides():
    articles = await db.guides.find({}, {"_id": 0}).to_list(50)
    return {"articles": articles}

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(req: ContactRequest):
    doc = {
        "id": str(uuid.uuid4()),
        "name": req.name,
        "email": req.email,
        "message": req.message,
        "created_at": datetime.utcnow().isoformat(),
    }
    await db.contacts.insert_one(doc)
    return ContactResponse(success=True, id=doc["id"])

@api_router.post("/waitlist", response_model=WaitlistResponse)
async def submit_waitlist(req: WaitlistRequest):
    doc = {
        "id": str(uuid.uuid4()),
        "prompt": req.prompt,
        "created_at": datetime.utcnow().isoformat(),
    }
    await db.waitlist.insert_one(doc)
    return WaitlistResponse(success=True, id=doc["id"])

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
