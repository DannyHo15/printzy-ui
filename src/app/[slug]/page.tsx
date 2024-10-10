import productsService from '@/api/products';
import Add from '@/components/Add';
// import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from '@/components/ProductImages';
import Reviews from '@/components/Reviews';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const product = await productsService.getOneBySlugAndSKU(params.slug);
  // console.log(product1.data);
  // const product = {
  //   name: "I'm a product",
  //   slug: 'i-m-a-product-11',
  //   visible: true,
  //   productType: 'physical',
  //   description:
  //     "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
  //   sku: '21554345656',
  //   weight: 0,
  //   weightRange: {
  //     minValue: 0,
  //     maxValue: 0,
  //   },
  //   stock: {
  //     trackInventory: false,
  //     inStock: true,
  //     inventoryStatus: 'IN_STOCK',
  //     quantity: 3,
  //   },
  //   price: {
  //     currency: 'VND',
  //     price: 120,
  //     discountedPrice: 120,
  //     formatted: {
  //       price: '120₫',
  //       discountedPrice: '120₫',
  //     },
  //   },
  //   priceData: {
  //     currency: 'VND',
  //     price: 120,
  //     discountedPrice: 120,
  //     formatted: {
  //       price: '120₫',
  //       discountedPrice: '120₫',
  //     },
  //   },
  //   convertedPriceData: {
  //     currency: 'VND',
  //     price: 120,
  //     discountedPrice: 120,
  //     formatted: {
  //       price: '120₫',
  //       discountedPrice: '120₫',
  //     },
  //   },
  //   priceRange: {
  //     minValue: 120,
  //     maxValue: 120,
  //   },
  //   costRange: {
  //     minValue: 0,
  //     maxValue: 0,
  //   },
  //   additionalInfoSections: [
  //     {
  //       title: 'PRODUCT INFO',
  //       description:
  //         "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
  //     },
  //     {
  //       title: 'RETURN & REFUND POLICY',
  //       description:
  //         'I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.',
  //     },
  //     {
  //       title: 'SHIPPING INFO',
  //       description:
  //         "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
  //     },
  //   ],
  //   ribbons: [],
  //   media: {
  //     mainMedia: {
  //       thumbnail: {
  //         url: 'https://static.wixstatic.com/media/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //         width: 50,
  //         height: 50,
  //       },
  //       mediaType: 'image',
  //       title: 'Tshirt-Context.jpg',
  //       image: {
  //         url: 'https://static.wixstatic.com/media/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg/v1/fit/w_3716,h_3716,q_90/file.jpg',
  //         width: 3716,
  //         height: 3716,
  //       },
  //       _id: '22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg',
  //     },
  //     items: [
  //       {
  //         thumbnail: {
  //           url: 'https://static.wixstatic.com/media/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //           width: 50,
  //           height: 50,
  //         },
  //         mediaType: 'image',
  //         title: 'Tshirt-Context.jpg',
  //         image: {
  //           url: 'https://static.wixstatic.com/media/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg/v1/fit/w_3716,h_3716,q_90/file.jpg',
  //           width: 3716,
  //           height: 3716,
  //         },
  //         _id: '22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg',
  //       },
  //       {
  //         thumbnail: {
  //           url: 'https://static.wixstatic.com/media/22e53e_4092f4f0f4d844afaed1cfde3069a6da~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //           width: 50,
  //           height: 50,
  //         },
  //         mediaType: 'image',
  //         title: 'Tshirt-Product.jpg',
  //         image: {
  //           url: 'https://static.wixstatic.com/media/22e53e_4092f4f0f4d844afaed1cfde3069a6da~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg',
  //           width: 4000,
  //           height: 4000,
  //         },
  //         _id: '22e53e_4092f4f0f4d844afaed1cfde3069a6da~mv2.jpg',
  //       },
  //     ],
  //   },
  //   customTextFields: [],
  //   manageVariants: false,
  //   productOptions: [
  //     {
  //       optionType: 'drop_down',
  //       name: 'Size',
  //       choices: [
  //         {
  //           value: 'Small',
  //           description: 'Small',
  //           inStock: true,
  //           visible: true,
  //         },
  //         {
  //           value: 'Large',
  //           description: 'Large',
  //           inStock: true,
  //           visible: true,
  //         },
  //       ],
  //     },
  //   ],
  //   productPageUrl: {
  //     base: 'https://201106362.wixsite.com/printify',
  //     path: '/product-page/i-m-a-product-11',
  //   },
  //   numericId: '1418288018058000',
  //   inventoryItemId: '599710cc-0a47-9a96-2fb3-e2edc4197bbe',
  //   discount: {
  //     type: 'NONE',
  //     value: 0,
  //   },
  //   collectionIds: [
  //     'd496e940-5a3c-e342-4836-8b39155c5eae',
  //     '00000000-000000-000000-000000000001',
  //   ],
  //   variants: [
  //     {
  //       choices: {},
  //       variant: {
  //         priceData: {
  //           currency: 'VND',
  //           price: 120,
  //           discountedPrice: 120,
  //           formatted: {
  //             price: '120₫',
  //             discountedPrice: '120₫',
  //           },
  //         },
  //         convertedPriceData: {
  //           currency: 'VND',
  //           price: 120,
  //           discountedPrice: 120,
  //           formatted: {
  //             price: '120₫',
  //             discountedPrice: '120₫',
  //           },
  //         },
  //         weight: 0,
  //         sku: '21554345656',
  //         visible: true,
  //       },
  //       stock: {
  //         trackQuantity: false,
  //         inStock: true,
  //         quantity: 3,
  //       },
  //       _id: '00000000-0000-0000-0000-000000000000',
  //     },
  //   ],
  //   lastUpdated: '2024-10-03T16:28:03.192Z',
  //   ribbon: '',
  //   exportProductId: 'product_a668ef33-f5b8-6569-d04c-1d123be68441',
  //   _id: 'a668ef33-f5b8-6569-d04c-1d123be68441',
  //   _createdDate: '2014-12-11T08:53:38.058Z',
  // };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.data?.photos} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.data?.name}</h1>

        <div className="h-[2px] bg-gray-100" />
        {product.data?.price === product.data?.discountedPrice ? (
          <h2 className="font-medium text-2xl">${product.data?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.data?.price}
            </h3>
            <h2 className="font-medium text-2xl">
              ${product.data?.discountedPrice}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100" />
        {/* {product.variants && product.productOptions ? (
          <></>
        ) : (
          <CustomizeProducts
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
          <Add
            productId={product._id!}
            variantId="00000000-0000-0000-0000-000000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        )} */}
        <div className="h-[2px] bg-gray-100" />
        <p className="text-gray-500 whitespace-pre-wrap">
          {product.data?.description}
        </p>
        {/* {product.additionalInfoSections?.map((section: any) => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <p>{section.description}</p>
          </div>
        ))} */}
        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS */}
        <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback="Loading...">
          <Reviews productId={product.data?.id!} />
        </Suspense>
      </div>
    </div>
  );
};

export default SinglePage;
