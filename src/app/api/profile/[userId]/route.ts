import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getProfile, updateProfile } from "@/data-access/profiles";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = parseInt(params.userId);
    if (user.id !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const profile = await getProfile(userId);

    if (!profile) {
      return new NextResponse(
        JSON.stringify({
          displayName: null,
          country: null,
          bio: null,
        }),
        { status: 200 }
      );
    }

    return new NextResponse(JSON.stringify(profile), { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = parseInt(params.userId);
    if (user.id !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { country, bio } = await req.json();

    if (country || bio) {
      await updateProfile(userId, { country, bio });
    }

    const updatedProfile = await getProfile(userId);
    return new NextResponse(JSON.stringify(updatedProfile), { status: 201 });
  } catch (error) {
    console.error("Error creating profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = parseInt(params.userId);
    if (user.id !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { displayName, country, bio } = await req.json();

    await updateProfile(userId, { displayName, country, bio });

    const updatedProfile = await getProfile(userId);
    return new NextResponse(JSON.stringify(updatedProfile), { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
