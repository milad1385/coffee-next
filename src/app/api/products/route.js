import connectToDB from "@/configs/db";
import productsModel from "@/models/Product";
import validator from "@/validators/product/create";
import { writeFileSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
export async function POST(req) {
  try {
    connectToDB();
    const body = await req.formData();
    const title = body.get("title");
    const price = body.get("price");
    const shortDesc = body.get("shortDesc");
    const longDesc = body.get("longDesc");
    const link = body.get("link");
    const tags = body.get("tags");
    const count = body.get("count");
    const weight = body.get("weight");
    const sutaibleFor = body.get("sutaibleFor");
    const smell = body.get("smell");
    const images = body.getAll("images");

    const datas = {
      title,
      price : +price,
      shortDesc,
      longDesc,
      link,
      tags,
      count : +count,
      weight : +weight,
      sutaibleFor,
      smell,
    };

    const isValid = await validator(datas);
    console.log(isValid);

    if (isValid !== true) {
      return Response.json({ msg: isValid }, { status: 422 });
    }

    if (!images.length) {
      return Response.json(
        { msg: "please upload image !!!!" },
        { status: 422 }
      );
    }

    let imageList = [];
    images.forEach(async (image) => {
      const fileName = Date.now() + image.name;
      let imageText = `http://localhost:3000/uploads/${fileName}`;
      imageList.push(imageText);
      const imagePath = path.join(process.cwd(), "public/uploads/" + fileName);
      const buffer = Buffer.from(await image.arrayBuffer());
      writeFileSync(imagePath, buffer);
    });

    await productsModel.create({
      title,
      price,
      shortDesc,
      longDesc,
      link,
      tags : tags.split("،"),
      count,
      weight,
      sutaibleFor,
      smell,
      images: imageList,
    });

    return Response.json(
      {
        msg: "product created successfully :)",
      },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { msg: "there is unknown err in server :(" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const products = await productsModel.find({});
  return Response.json(products);
}
