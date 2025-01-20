import dummyBooks from "../dummybooks.json";
import ImageKit from "imagekit";
import { books } from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({ path: ".env.local" });
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const uploadToIMageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imageKit.upload({
      file: url,
      fileName,
      folder,
    });

    return response.filePath;
  } catch (error) {
    console.error("Error uploading image to ImageKit:-", error);
  }
};

const seed = async () => {
  console.log("seeding data...");

  try {
    for (const book of dummyBooks) {
      const coverUrl = (await uploadToIMageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      )) as string;

      const videoUrl = (await uploadToIMageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos"
      )) as string;

      await db.insert(books).values({
        ...book,
        // coverUrl,
        coverUrl,
        videoUrl,
      });
    }

    console.log("data saved successfully");
  } catch (error) {
    console.log("Error Seeding data:-", error);
  }
};

seed();
