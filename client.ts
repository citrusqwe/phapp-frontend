import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  // projectId: process.env.SANITY_PROJECT_ID,
  projectId: 'kxhq1l5s',
  apiVersion: '2021-12-23',
  dataset: 'production',
  // token: process.env.SANITY_PROJECT_TOKEN,
  token:
    'skia8O7HC3Zqmpe5uKMOaozZr7wqI37gUtm8ssDZKJjWKT7Ejbx7GCANlIYgKUnTTH4KlBVbrNqn5H1QloITuJ4Us7Lu7uTOumhOgsoo4qtBkZ5HA7U1irrfvMVsllUCTZchu1ARhDHaSeygT3OcMBOUGWXgvcW60Wsj7Mg6VbgKUoD9IWGx',
  // useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (src: any) => builder.image(src);

export async function getAll() {
  const q = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        tags,
        postedBy->{
          _id,
          username,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            username,
            image
          },
        },
      } `;

  try {
    const pins = await client.fetch(q);

    return pins;
  } catch (error) {
    console.log(error);
  }
}

export async function getPinById(id: string) {
  const q = `*[_type == "pin" && _id == "${id}"] | order(_createdAt desc) [0] {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        tags,
        postedBy->{
          _id,
          username,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            username,
            image
          },
        },
      } `;

  try {
    const pins = await client.fetch(q);
    return pins;
  } catch (error) {
    console.log(error);
  }
}

export async function getPinsByTags(c: string) {
  const q = `*[_type == "pin" && '${c}' in tags[].text ] |  order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        tags,
        postedBy->{
          _id,
          username,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            username,
            image
          },
        },
      }`;

  try {
    const pins = await client.fetch(q);

    return pins;
  } catch (error) {
    console.log(error);
  }
}

export async function getRelatedPins(tags: { text: string }[], id: string) {
  console.log(tags);
  const q = `*[_type == "pin" && ${tags} match tags && _id != "${id}" ] |  order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        tags,
        postedBy->{
          _id,
          username,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            username,
            image
          },
        },
      }`;

  try {
    const pins = await client.fetch(q);

    return pins;
  } catch (error) {
    console.log(error);
  }
}

export async function searchPins(term: string) {
  const q = `*[_type in ["pin", "user"] && '${term}' in tags[].text || username match '${term}' || description match '${term}' ] |  order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        description,
        tags,
        postedBy->{
          _id,
          username,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            username,
            image
          },
        },
      }`;

  try {
    const pins = await client.fetch(q);

    return pins;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadImage(selectedFile: File) {
  try {
    const uploadedFile = await client.assets.upload('image', selectedFile, {
      contentType: selectedFile.type,
      filename: selectedFile.name,
    });

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteImageFromAssets(id: string) {
  try {
    client.delete(id).then((result) => {
      console.log('deleted image asset', result);
    });
  } catch (error) {
    console.log(error);
  }
}

export const getAllCategories = async () => {
  const q = `*[_type == "tag"]`;

  try {
    const categories = await client.fetch(q);

    return categories;
  } catch (error) {
    console.log(error);
  }
};

export const searchCategories = async (term: string) => {
  const q = `*[_type == "tag" && text match '${term}${term ? '*' : ''}']`;

  try {
    const categories = await client.fetch(q);
    return categories;
  } catch (error) {
    console.log(error);
  }
};

export const createPin = async (doc: any) => {
  try {
    const newPin = await client.create(doc);
  } catch (error) {
    console.log(error);
  }
};
