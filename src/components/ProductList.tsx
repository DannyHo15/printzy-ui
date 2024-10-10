// import Image from 'next/image';
// import Link from 'next/link';
// // import DOMPurify from "isomorphic-dompurify";
// import Pagination from './Pagination';
import productsService from '@/api/products';
import ProductCard from './ProductCard';

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  // let res = {
  //   items: [
  //     {
  //       name: "I'm a product",
  //       slug: 'i-m-a-product-9',
  //       visible: true,
  //       productType: 'physical',
  //       description:
  //         "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
  //       sku: '126351351935',
  //       weight: 0,
  //       weightRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       stock: {
  //         trackInventory: false,
  //         inStock: true,
  //         inventoryStatus: 'IN_STOCK',
  //       },
  //       price: {
  //         currency: 'VND',
  //         price: 45,
  //         discountedPrice: 45,
  //         formatted: {
  //           price: '45₫',
  //           discountedPrice: '45₫',
  //         },
  //       },
  //       priceData: {
  //         currency: 'VND',
  //         price: 45,
  //         discountedPrice: 45,
  //         formatted: {
  //           price: '45₫',
  //           discountedPrice: '45₫',
  //         },
  //       },
  //       convertedPriceData: {
  //         currency: 'VND',
  //         price: 45,
  //         discountedPrice: 45,
  //         formatted: {
  //           price: '45₫',
  //           discountedPrice: '45₫',
  //         },
  //       },
  //       priceRange: {
  //         minValue: 45,
  //         maxValue: 45,
  //       },
  //       costRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       additionalInfoSections: [
  //         {
  //           title: 'PRODUCT INFO',
  //           description:
  //             "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
  //         },
  //         {
  //           title: 'RETURN & REFUND POLICY',
  //           description:
  //             'I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.',
  //         },
  //         {
  //           title: 'SHIPPING INFO',
  //           description:
  //             "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
  //         },
  //       ],
  //       ribbons: [],
  //       media: {
  //         mainMedia: {
  //           thumbnail: {
  //             url: 'https://static.wixstatic.com/media/22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //             width: 50,
  //             height: 50,
  //           },
  //           mediaType: 'image',
  //           title: 'Diffuser-Product.jpg',
  //           image: {
  //             url: 'https://static.wixstatic.com/media/22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg/v1/fit/w_2000,h_2000,q_90/file.jpg',
  //             width: 2000,
  //             height: 2000,
  //           },
  //           _id: '22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg',
  //         },
  //         items: [
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Diffuser-Product.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg/v1/fit/w_2000,h_2000,q_90/file.jpg',
  //               width: 2000,
  //               height: 2000,
  //             },
  //             _id: '22e53e_1addd1e1b4c64c9abd47dbc5f36d4b01~mv2.jpg',
  //           },
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_fcd691909a3742938a8cfa05c1cd2b0a~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Diffuser-Context.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_fcd691909a3742938a8cfa05c1cd2b0a~mv2.jpg/v1/fit/w_2895,h_2895,q_90/file.jpg',
  //               width: 2895,
  //               height: 2895,
  //             },
  //             _id: '22e53e_fcd691909a3742938a8cfa05c1cd2b0a~mv2.jpg',
  //           },
  //         ],
  //       },
  //       customTextFields: [],
  //       manageVariants: false,
  //       productOptions: [],
  //       productPageUrl: {
  //         base: 'https://201106362.wixsite.com/printify',
  //         path: '/product-page/i-m-a-product-9',
  //       },
  //       numericId: '1418287987413000',
  //       inventoryItemId: '844c7585-8f48-630c-037f-a7bdfa96bb9a',
  //       discount: {
  //         type: 'NONE',
  //         value: 0,
  //       },
  //       collectionIds: [
  //         'd496e940-5a3c-e342-4836-8b39155c5eae',
  //         '00000000-000000-000000-000000000001',
  //       ],
  //       variants: [
  //         {
  //           choices: {},
  //           variant: {
  //             priceData: {
  //               currency: 'VND',
  //               price: 45,
  //               discountedPrice: 45,
  //               formatted: {
  //                 price: '45₫',
  //                 discountedPrice: '45₫',
  //               },
  //             },
  //             convertedPriceData: {
  //               currency: 'VND',
  //               price: 45,
  //               discountedPrice: 45,
  //               formatted: {
  //                 price: '45₫',
  //                 discountedPrice: '45₫',
  //               },
  //             },
  //             weight: 0,
  //             sku: '126351351935',
  //             visible: true,
  //           },
  //           stock: {
  //             trackQuantity: false,
  //             inStock: true,
  //           },
  //           _id: '00000000-0000-0000-0000-000000000000',
  //         },
  //       ],
  //       lastUpdated: '2024-10-03T16:28:03.192Z',
  //       ribbon: '',
  //       exportProductId: 'product_7bb38a7a-70b7-9cf3-fc80-584205694465',
  //       _id: '7bb38a7a-70b7-9cf3-fc80-584205694465',
  //       _createdDate: '2014-12-11T08:53:07.413Z',
  //     },
  //     {
  //       name: "I'm a product",
  //       slug: 'i-m-a-product-5',
  //       visible: true,
  //       productType: 'physical',
  //       description:
  //         "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
  //       sku: '36523641234523',
  //       weight: 0,
  //       weightRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       stock: {
  //         trackInventory: false,
  //         inStock: true,
  //         inventoryStatus: 'IN_STOCK',
  //       },
  //       price: {
  //         currency: 'VND',
  //         price: 15,
  //         discountedPrice: 15,
  //         formatted: {
  //           price: '15₫',
  //           discountedPrice: '15₫',
  //         },
  //       },
  //       priceData: {
  //         currency: 'VND',
  //         price: 15,
  //         discountedPrice: 15,
  //         formatted: {
  //           price: '15₫',
  //           discountedPrice: '15₫',
  //         },
  //       },
  //       convertedPriceData: {
  //         currency: 'VND',
  //         price: 15,
  //         discountedPrice: 15,
  //         formatted: {
  //           price: '15₫',
  //           discountedPrice: '15₫',
  //         },
  //       },
  //       priceRange: {
  //         minValue: 15,
  //         maxValue: 15,
  //       },
  //       costRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       additionalInfoSections: [
  //         {
  //           title: 'PRODUCT INFO',
  //           description:
  //             "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
  //         },
  //         {
  //           title: 'RETURN & REFUND POLICY',
  //           description:
  //             'I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.',
  //         },
  //         {
  //           title: 'SHIPPING INFO',
  //           description:
  //             "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
  //         },
  //       ],
  //       ribbons: [],
  //       media: {
  //         mainMedia: {
  //           thumbnail: {
  //             url: 'https://static.wixstatic.com/media/22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //             width: 50,
  //             height: 50,
  //           },
  //           mediaType: 'image',
  //           title: 'Chair-Product.jpg',
  //           image: {
  //             url: 'https://static.wixstatic.com/media/22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg',
  //             width: 4000,
  //             height: 4000,
  //           },
  //           _id: '22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg',
  //         },
  //         items: [
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Chair-Product.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg',
  //               width: 4000,
  //               height: 4000,
  //             },
  //             _id: '22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg',
  //           },
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_6d297acebd3b4b2890f1a0e92b8a7158~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Chair-Context.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_6d297acebd3b4b2890f1a0e92b8a7158~mv2.jpg/v1/fit/w_2000,h_2000,q_90/file.jpg',
  //               width: 2000,
  //               height: 2000,
  //             },
  //             _id: '22e53e_6d297acebd3b4b2890f1a0e92b8a7158~mv2.jpg',
  //           },
  //         ],
  //       },
  //       customTextFields: [],
  //       manageVariants: false,
  //       productOptions: [],
  //       productPageUrl: {
  //         base: 'https://201106362.wixsite.com/printify',
  //         path: '/product-page/i-m-a-product-5',
  //       },
  //       numericId: '1418288006255000',
  //       inventoryItemId: 'c0495c37-6774-78aa-fb42-a3a651f4e715',
  //       discount: {
  //         type: 'NONE',
  //         value: 0,
  //       },
  //       collectionIds: [
  //         'd496e940-5a3c-e342-4836-8b39155c5eae',
  //         '00000000-000000-000000-000000000001',
  //       ],
  //       variants: [
  //         {
  //           choices: {},
  //           variant: {
  //             priceData: {
  //               currency: 'VND',
  //               price: 15,
  //               discountedPrice: 15,
  //               formatted: {
  //                 price: '15₫',
  //                 discountedPrice: '15₫',
  //               },
  //             },
  //             convertedPriceData: {
  //               currency: 'VND',
  //               price: 15,
  //               discountedPrice: 15,
  //               formatted: {
  //                 price: '15₫',
  //                 discountedPrice: '15₫',
  //               },
  //             },
  //             weight: 0,
  //             sku: '36523641234523',
  //             visible: true,
  //           },
  //           stock: {
  //             trackQuantity: false,
  //             inStock: true,
  //           },
  //           _id: '00000000-0000-0000-0000-000000000000',
  //         },
  //       ],
  //       lastUpdated: '2024-10-03T16:28:03.192Z',
  //       ribbon: '',
  //       exportProductId: 'product_3fb6a3c8-988b-8755-04bd-5c59ae0b18ea',
  //       _id: '3fb6a3c8-988b-8755-04bd-5c59ae0b18ea',
  //       _createdDate: '2014-12-11T08:53:26.255Z',
  //     },
  //     {
  //       name: "I'm a product",
  //       slug: 'i-m-a-product-11',
  //       visible: true,
  //       productType: 'physical',
  //       description:
  //         "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
  //       sku: '21554345656',
  //       weight: 0,
  //       weightRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       stock: {
  //         trackInventory: false,
  //         inStock: true,
  //         inventoryStatus: 'IN_STOCK',
  //       },
  //       price: {
  //         currency: 'VND',
  //         price: 120,
  //         discountedPrice: 120,
  //         formatted: {
  //           price: '120₫',
  //           discountedPrice: '120₫',
  //         },
  //       },
  //       priceData: {
  //         currency: 'VND',
  //         price: 120,
  //         discountedPrice: 120,
  //         formatted: {
  //           price: '120₫',
  //           discountedPrice: '120₫',
  //         },
  //       },
  //       convertedPriceData: {
  //         currency: 'VND',
  //         price: 120,
  //         discountedPrice: 120,
  //         formatted: {
  //           price: '120₫',
  //           discountedPrice: '120₫',
  //         },
  //       },
  //       priceRange: {
  //         minValue: 120,
  //         maxValue: 120,
  //       },
  //       costRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       additionalInfoSections: [
  //         {
  //           title: 'PRODUCT INFO',
  //           description:
  //             "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
  //         },
  //         {
  //           title: 'RETURN & REFUND POLICY',
  //           description:
  //             'I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.',
  //         },
  //         {
  //           title: 'SHIPPING INFO',
  //           description:
  //             "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
  //         },
  //       ],
  //       ribbons: [],
  //       media: {
  //         mainMedia: {
  //           thumbnail: {
  //             url: 'https://static.wixstatic.com/media/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //             width: 50,
  //             height: 50,
  //           },
  //           mediaType: 'image',
  //           title: 'Tshirt-Context.jpg',
  //           image: {
  //             url: 'https://static.wixstatic.com/media/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg/v1/fit/w_3716,h_3716,q_90/file.jpg',
  //             width: 3716,
  //             height: 3716,
  //           },
  //           _id: '22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg',
  //         },
  //         items: [
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Tshirt-Context.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg/v1/fit/w_3716,h_3716,q_90/file.jpg',
  //               width: 3716,
  //               height: 3716,
  //             },
  //             _id: '22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg',
  //           },
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_4092f4f0f4d844afaed1cfde3069a6da~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Tshirt-Product.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_4092f4f0f4d844afaed1cfde3069a6da~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg',
  //               width: 4000,
  //               height: 4000,
  //             },
  //             _id: '22e53e_4092f4f0f4d844afaed1cfde3069a6da~mv2.jpg',
  //           },
  //         ],
  //       },
  //       customTextFields: [],
  //       manageVariants: false,
  //       productOptions: [
  //         {
  //           optionType: 'drop_down',
  //           name: 'Size',
  //           choices: [
  //             {
  //               value: 'Small',
  //               description: 'Small',
  //               inStock: true,
  //               visible: true,
  //             },
  //             {
  //               value: 'Large',
  //               description: 'Large',
  //               inStock: true,
  //               visible: true,
  //             },
  //           ],
  //         },
  //       ],
  //       productPageUrl: {
  //         base: 'https://201106362.wixsite.com/printify',
  //         path: '/product-page/i-m-a-product-11',
  //       },
  //       numericId: '1418288018058000',
  //       inventoryItemId: '599710cc-0a47-9a96-2fb3-e2edc4197bbe',
  //       discount: {
  //         type: 'NONE',
  //         value: 0,
  //       },
  //       collectionIds: [
  //         'd496e940-5a3c-e342-4836-8b39155c5eae',
  //         '00000000-000000-000000-000000000001',
  //       ],
  //       variants: [
  //         {
  //           choices: {},
  //           variant: {
  //             priceData: {
  //               currency: 'VND',
  //               price: 120,
  //               discountedPrice: 120,
  //               formatted: {
  //                 price: '120₫',
  //                 discountedPrice: '120₫',
  //               },
  //             },
  //             convertedPriceData: {
  //               currency: 'VND',
  //               price: 120,
  //               discountedPrice: 120,
  //               formatted: {
  //                 price: '120₫',
  //                 discountedPrice: '120₫',
  //               },
  //             },
  //             weight: 0,
  //             sku: '21554345656',
  //             visible: true,
  //           },
  //           stock: {
  //             trackQuantity: false,
  //             inStock: true,
  //           },
  //           _id: '00000000-0000-0000-0000-000000000000',
  //         },
  //       ],
  //       lastUpdated: '2024-10-03T16:28:03.192Z',
  //       ribbon: '',
  //       exportProductId: 'product_a668ef33-f5b8-6569-d04c-1d123be68441',
  //       _id: 'a668ef33-f5b8-6569-d04c-1d123be68441',
  //       _createdDate: '2014-12-11T08:53:38.058Z',
  //     },
  //     {
  //       name: "I'm a product",
  //       slug: 'i-m-a-product-3',
  //       visible: true,
  //       productType: 'physical',
  //       description:
  //         "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
  //       weightRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       stock: {
  //         trackInventory: true,
  //         quantity: 200,
  //         inStock: true,
  //         inventoryStatus: 'PARTIALLY_OUT_OF_STOCK',
  //       },
  //       price: {
  //         currency: 'VND',
  //         price: 25,
  //         discountedPrice: 25,
  //         formatted: {
  //           price: '25₫',
  //           discountedPrice: '25₫',
  //         },
  //       },
  //       priceData: {
  //         currency: 'VND',
  //         price: 25,
  //         discountedPrice: 25,
  //         formatted: {
  //           price: '25₫',
  //           discountedPrice: '25₫',
  //         },
  //       },
  //       convertedPriceData: {
  //         currency: 'VND',
  //         price: 25,
  //         discountedPrice: 25,
  //         formatted: {
  //           price: '25₫',
  //           discountedPrice: '25₫',
  //         },
  //       },
  //       priceRange: {
  //         minValue: 50,
  //         maxValue: 50,
  //       },
  //       costRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       additionalInfoSections: [
  //         {
  //           title: 'PRODUCT INFO',
  //           description:
  //             "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
  //         },
  //         {
  //           title: 'RETURN & REFUND POLICY',
  //           description:
  //             'I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.',
  //         },
  //         {
  //           title: 'SHIPPING INFO',
  //           description:
  //             "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
  //         },
  //       ],
  //       ribbons: [],
  //       media: {
  //         mainMedia: {
  //           thumbnail: {
  //             url: 'https://static.wixstatic.com/media/22e53e_01575d792adb43a6a16595bd74a1cc8d~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //             width: 50,
  //             height: 50,
  //           },
  //           mediaType: 'image',
  //           title: 'Sweater-Product.jpg',
  //           image: {
  //             url: 'https://static.wixstatic.com/media/22e53e_01575d792adb43a6a16595bd74a1cc8d~mv2.jpg/v1/fit/w_2662,h_2662,q_90/file.jpg',
  //             width: 2662,
  //             height: 2662,
  //           },
  //           _id: '22e53e_01575d792adb43a6a16595bd74a1cc8d~mv2.jpg',
  //         },
  //         items: [
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_01575d792adb43a6a16595bd74a1cc8d~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Sweater-Product.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_01575d792adb43a6a16595bd74a1cc8d~mv2.jpg/v1/fit/w_2662,h_2662,q_90/file.jpg',
  //               width: 2662,
  //               height: 2662,
  //             },
  //             _id: '22e53e_01575d792adb43a6a16595bd74a1cc8d~mv2.jpg',
  //           },
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_dc9ea8282a4944edab558992753a6d72~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Sweater-Model.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_dc9ea8282a4944edab558992753a6d72~mv2.jpg/v1/fit/w_3007,h_3007,q_90/file.jpg',
  //               width: 3007,
  //               height: 3007,
  //             },
  //             _id: '22e53e_dc9ea8282a4944edab558992753a6d72~mv2.jpg',
  //           },
  //         ],
  //       },
  //       customTextFields: [],
  //       manageVariants: true,
  //       productOptions: [
  //         {
  //           optionType: 'drop_down',
  //           name: 'Size',
  //           choices: [
  //             {
  //               value: 'Small',
  //               description: 'Small',
  //               media: {
  //                 items: [],
  //               },
  //               inStock: false,
  //               visible: true,
  //             },
  //             {
  //               value: 'Medium',
  //               description: 'Medium',
  //               media: {
  //                 items: [],
  //               },
  //               inStock: true,
  //               visible: true,
  //             },
  //             {
  //               value: 'Large',
  //               description: 'Large',
  //               media: {
  //                 items: [],
  //               },
  //               inStock: true,
  //               visible: true,
  //             },
  //           ],
  //         },
  //       ],
  //       productPageUrl: {
  //         base: 'https://201106362.wixsite.com/printify',
  //         path: '/product-page/i-m-a-product-3',
  //       },
  //       numericId: '1418288029710000',
  //       inventoryItemId: 'e5d2817c-b410-ce2a-f61e-ccd911d8e3f6',
  //       discount: {
  //         type: 'NONE',
  //         value: 0,
  //       },
  //       collectionIds: [
  //         'd496e940-5a3c-e342-4836-8b39155c5eae',
  //         '00000000-000000-000000-000000000001',
  //       ],
  //       variants: [
  //         {
  //           choices: {
  //             Size: 'Small',
  //           },
  //           variant: {
  //             priceData: {
  //               currency: 'VND',
  //               price: 50,
  //               discountedPrice: 50,
  //               formatted: {
  //                 price: '50₫',
  //                 discountedPrice: '50₫',
  //               },
  //             },
  //             convertedPriceData: {
  //               currency: 'VND',
  //               price: 50,
  //               discountedPrice: 50,
  //               formatted: {
  //                 price: '50₫',
  //                 discountedPrice: '50₫',
  //               },
  //             },
  //             weight: 0,
  //             sku: '217537123517253',
  //             visible: true,
  //           },
  //           stock: {
  //             trackQuantity: true,
  //             quantity: 0,
  //             inStock: false,
  //           },
  //           _id: '6225f6cc-2dca-4da5-b7f0-52103e2a1dda',
  //         },
  //         {
  //           choices: {
  //             Size: 'Medium',
  //           },
  //           variant: {
  //             priceData: {
  //               currency: 'VND',
  //               price: 50,
  //               discountedPrice: 50,
  //               formatted: {
  //                 price: '50₫',
  //                 discountedPrice: '50₫',
  //               },
  //             },
  //             convertedPriceData: {
  //               currency: 'VND',
  //               price: 50,
  //               discountedPrice: 50,
  //               formatted: {
  //                 price: '50₫',
  //                 discountedPrice: '50₫',
  //               },
  //             },
  //             weight: 0,
  //             sku: '217537123517253',
  //             visible: true,
  //           },
  //           stock: {
  //             trackQuantity: true,
  //             quantity: 100,
  //             inStock: true,
  //           },
  //           _id: '072f13bf-d7bf-4365-ab6c-0861c347e0bf',
  //         },
  //         {
  //           choices: {
  //             Size: 'Large',
  //           },
  //           variant: {
  //             priceData: {
  //               currency: 'VND',
  //               price: 50,
  //               discountedPrice: 50,
  //               formatted: {
  //                 price: '50₫',
  //                 discountedPrice: '50₫',
  //               },
  //             },
  //             convertedPriceData: {
  //               currency: 'VND',
  //               price: 50,
  //               discountedPrice: 50,
  //               formatted: {
  //                 price: '50₫',
  //                 discountedPrice: '50₫',
  //               },
  //             },
  //             weight: 0,
  //             sku: '217537123517253',
  //             visible: true,
  //           },
  //           stock: {
  //             trackQuantity: true,
  //             quantity: 100,
  //             inStock: true,
  //           },
  //           _id: '723dd3f4-8feb-48a4-8ae6-16350f05054b',
  //         },
  //       ],
  //       lastUpdated: '2024-10-03T18:00:33.492Z',
  //       ribbon: '',
  //       exportProductId: 'product_1a2d7e83-4bef-31d5-09e1-3326ee271c09',
  //       _id: '1a2d7e83-4bef-31d5-09e1-3326ee271c09',
  //       _createdDate: '2014-12-11T08:53:49.710Z',
  //     },
  //     {
  //       name: "I'm a product",
  //       slug: 'i-m-a-product-10',
  //       visible: true,
  //       productType: 'physical',
  //       description:
  //         "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
  //       sku: '671253175371',
  //       weight: 0,
  //       weightRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       stock: {
  //         trackInventory: false,
  //         inStock: true,
  //         inventoryStatus: 'IN_STOCK',
  //       },
  //       price: {
  //         currency: 'VND',
  //         price: 100,
  //         discountedPrice: 95,
  //         formatted: {
  //           price: '100₫',
  //           discountedPrice: '95₫',
  //         },
  //       },
  //       priceData: {
  //         currency: 'VND',
  //         price: 100,
  //         discountedPrice: 95,
  //         formatted: {
  //           price: '100₫',
  //           discountedPrice: '95₫',
  //         },
  //       },
  //       convertedPriceData: {
  //         currency: 'VND',
  //         price: 100,
  //         discountedPrice: 95,
  //         formatted: {
  //           price: '100₫',
  //           discountedPrice: '95₫',
  //         },
  //       },
  //       priceRange: {
  //         minValue: 100,
  //         maxValue: 100,
  //       },
  //       costRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       additionalInfoSections: [
  //         {
  //           title: 'PRODUCT INFO',
  //           description:
  //             "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
  //         },
  //         {
  //           title: 'RETURN & REFUND POLICY',
  //           description:
  //             'I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.',
  //         },
  //         {
  //           title: 'SHIPPING INFO',
  //           description:
  //             "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
  //         },
  //       ],
  //       ribbons: [
  //         {
  //           text: 'Sale',
  //         },
  //       ],
  //       media: {
  //         mainMedia: {
  //           thumbnail: {
  //             url: 'https://static.wixstatic.com/media/22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //             width: 50,
  //             height: 50,
  //           },
  //           mediaType: 'image',
  //           title: 'Earrings-Product.jpg',
  //           image: {
  //             url: 'https://static.wixstatic.com/media/22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg/v1/fit/w_3000,h_3000,q_90/file.jpg',
  //             width: 3000,
  //             height: 3000,
  //           },
  //           _id: '22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg',
  //         },
  //         items: [
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Earrings-Product.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg/v1/fit/w_3000,h_3000,q_90/file.jpg',
  //               width: 3000,
  //               height: 3000,
  //             },
  //             _id: '22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg',
  //           },
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_924a086d18674cf281197d72d47207c1~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Earrings-Context.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_924a086d18674cf281197d72d47207c1~mv2.jpg/v1/fit/w_2000,h_2000,q_90/file.jpg',
  //               width: 2000,
  //               height: 2000,
  //             },
  //             _id: '22e53e_924a086d18674cf281197d72d47207c1~mv2.jpg',
  //           },
  //         ],
  //       },
  //       customTextFields: [],
  //       manageVariants: false,
  //       productOptions: [],
  //       productPageUrl: {
  //         base: 'https://201106362.wixsite.com/printify',
  //         path: '/product-page/i-m-a-product-10',
  //       },
  //       numericId: '1418288044934000',
  //       inventoryItemId: 'ad4f9a70-c4c2-8691-6acd-783286b97c9c',
  //       discount: {
  //         type: 'PERCENT',
  //         value: 5,
  //       },
  //       collectionIds: [
  //         'd496e940-5a3c-e342-4836-8b39155c5eae',
  //         '00000000-000000-000000-000000000001',
  //       ],
  //       variants: [
  //         {
  //           choices: {},
  //           variant: {
  //             priceData: {
  //               currency: 'VND',
  //               price: 100,
  //               discountedPrice: 95,
  //               formatted: {
  //                 price: '100₫',
  //                 discountedPrice: '95₫',
  //               },
  //             },
  //             convertedPriceData: {
  //               currency: 'VND',
  //               price: 100,
  //               discountedPrice: 95,
  //               formatted: {
  //                 price: '100₫',
  //                 discountedPrice: '95₫',
  //               },
  //             },
  //             weight: 0,
  //             sku: '671253175371',
  //             visible: true,
  //           },
  //           stock: {
  //             trackQuantity: false,
  //             inStock: true,
  //           },
  //           _id: '00000000-0000-0000-0000-000000000000',
  //         },
  //       ],
  //       lastUpdated: '2024-10-03T16:28:03.192Z',
  //       ribbon: 'Sale',
  //       exportProductId: 'product_52b0658f-3b3d-796e-9532-87cd79468363',
  //       _id: '52b0658f-3b3d-796e-9532-87cd79468363',
  //       _createdDate: '2014-12-11T08:54:04.934Z',
  //     },
  //     {
  //       name: "I'm a product",
  //       slug: 'i-m-a-product-7',
  //       visible: true,
  //       productType: 'physical',
  //       description:
  //         "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
  //       sku: '632835642834572',
  //       weight: 0,
  //       weightRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       stock: {
  //         trackInventory: false,
  //         inStock: true,
  //         inventoryStatus: 'IN_STOCK',
  //       },
  //       price: {
  //         currency: 'VND',
  //         price: 40,
  //         discountedPrice: 40,
  //         formatted: {
  //           price: '40₫',
  //           discountedPrice: '40₫',
  //         },
  //       },
  //       priceData: {
  //         currency: 'VND',
  //         price: 40,
  //         discountedPrice: 40,
  //         formatted: {
  //           price: '40₫',
  //           discountedPrice: '40₫',
  //         },
  //       },
  //       convertedPriceData: {
  //         currency: 'VND',
  //         price: 40,
  //         discountedPrice: 40,
  //         formatted: {
  //           price: '40₫',
  //           discountedPrice: '40₫',
  //         },
  //       },
  //       priceRange: {
  //         minValue: 40,
  //         maxValue: 40,
  //       },
  //       costRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       additionalInfoSections: [
  //         {
  //           title: 'PRODUCT INFO',
  //           description:
  //             "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
  //         },
  //         {
  //           title: 'RETURN & REFUND POLICY',
  //           description:
  //             'I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.',
  //         },
  //         {
  //           title: 'SHIPPING INFO',
  //           description:
  //             "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
  //         },
  //       ],
  //       ribbons: [],
  //       media: {
  //         mainMedia: {
  //           thumbnail: {
  //             url: 'https://static.wixstatic.com/media/22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //             width: 50,
  //             height: 50,
  //           },
  //           mediaType: 'image',
  //           title: 'Cap-Product.jpg',
  //           image: {
  //             url: 'https://static.wixstatic.com/media/22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg',
  //             width: 4000,
  //             height: 4000,
  //           },
  //           _id: '22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg',
  //         },
  //         items: [
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Cap-Product.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg',
  //               width: 4000,
  //               height: 4000,
  //             },
  //             _id: '22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg',
  //           },
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_f2d6c005d04646fd8bed4cffbca35c1e~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Cap-Context.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_f2d6c005d04646fd8bed4cffbca35c1e~mv2.jpg/v1/fit/w_2250,h_2250,q_90/file.jpg',
  //               width: 2250,
  //               height: 2250,
  //             },
  //             _id: '22e53e_f2d6c005d04646fd8bed4cffbca35c1e~mv2.jpg',
  //           },
  //         ],
  //       },
  //       customTextFields: [],
  //       manageVariants: false,
  //       productOptions: [],
  //       productPageUrl: {
  //         base: 'https://201106362.wixsite.com/printify',
  //         path: '/product-page/i-m-a-product-7',
  //       },
  //       numericId: '1418288087492000',
  //       inventoryItemId: '9498874b-39d9-3ff2-68d3-4ec727a1c0f8',
  //       discount: {
  //         type: 'NONE',
  //         value: 0,
  //       },
  //       collectionIds: [
  //         'd496e940-5a3c-e342-4836-8b39155c5eae',
  //         '00000000-000000-000000-000000000001',
  //       ],
  //       variants: [
  //         {
  //           choices: {},
  //           variant: {
  //             priceData: {
  //               currency: 'VND',
  //               price: 40,
  //               discountedPrice: 40,
  //               formatted: {
  //                 price: '40₫',
  //                 discountedPrice: '40₫',
  //               },
  //             },
  //             convertedPriceData: {
  //               currency: 'VND',
  //               price: 40,
  //               discountedPrice: 40,
  //               formatted: {
  //                 price: '40₫',
  //                 discountedPrice: '40₫',
  //               },
  //             },
  //             weight: 0,
  //             sku: '632835642834572',
  //             visible: true,
  //           },
  //           stock: {
  //             trackQuantity: false,
  //             inStock: true,
  //           },
  //           _id: '00000000-0000-0000-0000-000000000000',
  //         },
  //       ],
  //       lastUpdated: '2024-10-03T16:28:03.192Z',
  //       ribbon: '',
  //       exportProductId: 'product_6b6778b4-c626-c00d-972c-b138d85e3f07',
  //       _id: '6b6778b4-c626-c00d-972c-b138d85e3f07',
  //       _createdDate: '2014-12-11T08:54:47.492Z',
  //     },
  //     {
  //       name: "I'm a product",
  //       slug: 'i-m-a-product-4',
  //       visible: true,
  //       productType: 'physical',
  //       description:
  //         "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
  //       sku: '366615376135191',
  //       weight: 0,
  //       weightRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       stock: {
  //         trackInventory: false,
  //         inStock: true,
  //         inventoryStatus: 'IN_STOCK',
  //       },
  //       price: {
  //         currency: 'VND',
  //         price: 7.5,
  //         discountedPrice: 7.5,
  //         formatted: {
  //           price: '8₫',
  //           discountedPrice: '8₫',
  //         },
  //       },
  //       priceData: {
  //         currency: 'VND',
  //         price: 7.5,
  //         discountedPrice: 7.5,
  //         formatted: {
  //           price: '8₫',
  //           discountedPrice: '8₫',
  //         },
  //       },
  //       convertedPriceData: {
  //         currency: 'VND',
  //         price: 7.5,
  //         discountedPrice: 7.5,
  //         formatted: {
  //           price: '8₫',
  //           discountedPrice: '8₫',
  //         },
  //       },
  //       priceRange: {
  //         minValue: 7.5,
  //         maxValue: 7.5,
  //       },
  //       costRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       additionalInfoSections: [
  //         {
  //           title: 'PRODUCT INFO',
  //           description:
  //             "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
  //         },
  //         {
  //           title: 'RETURN & REFUND POLICY',
  //           description:
  //             'I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.',
  //         },
  //         {
  //           title: 'SHIPPING INFO',
  //           description:
  //             "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
  //         },
  //       ],
  //       ribbons: [
  //         {
  //           text: 'New',
  //         },
  //       ],
  //       media: {
  //         mainMedia: {
  //           thumbnail: {
  //             url: 'https://static.wixstatic.com/media/22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //             width: 50,
  //             height: 50,
  //           },
  //           mediaType: 'image',
  //           title: 'Glasses-Product.jpg',
  //           image: {
  //             url: 'https://static.wixstatic.com/media/22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg/v1/fit/w_3708,h_3709,q_90/file.jpg',
  //             width: 3708,
  //             height: 3709,
  //           },
  //           _id: '22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg',
  //         },
  //         items: [
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Glasses-Product.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg/v1/fit/w_3708,h_3709,q_90/file.jpg',
  //               width: 3708,
  //               height: 3709,
  //             },
  //             _id: '22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg',
  //           },
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_ec22d9d4c6044e1eb996b4c86dd6af2b~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Glasses-Context.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_ec22d9d4c6044e1eb996b4c86dd6af2b~mv2.jpg/v1/fit/w_2938,h_2938,q_90/file.jpg',
  //               width: 2938,
  //               height: 2938,
  //             },
  //             _id: '22e53e_ec22d9d4c6044e1eb996b4c86dd6af2b~mv2.jpg',
  //           },
  //         ],
  //       },
  //       customTextFields: [],
  //       manageVariants: false,
  //       productOptions: [
  //         {
  //           optionType: 'drop_down',
  //           name: 'Size',
  //           choices: [
  //             {
  //               value: 'Small',
  //               description: 'Small',
  //               inStock: true,
  //               visible: true,
  //             },
  //             {
  //               value: 'Large',
  //               description: 'Large',
  //               inStock: true,
  //               visible: true,
  //             },
  //           ],
  //         },
  //       ],
  //       productPageUrl: {
  //         base: 'https://201106362.wixsite.com/printify',
  //         path: '/product-page/i-m-a-product-4',
  //       },
  //       numericId: '1418288149958000',
  //       inventoryItemId: '2662c337-438a-13b8-938d-08ecfe90670c',
  //       discount: {
  //         type: 'NONE',
  //         value: 0,
  //       },
  //       collectionIds: [
  //         'd496e940-5a3c-e342-4836-8b39155c5eae',
  //         '00000000-000000-000000-000000000001',
  //       ],
  //       variants: [
  //         {
  //           choices: {},
  //           variant: {
  //             priceData: {
  //               currency: 'VND',
  //               price: 7.5,
  //               discountedPrice: 7.5,
  //               formatted: {
  //                 price: '8₫',
  //                 discountedPrice: '8₫',
  //               },
  //             },
  //             convertedPriceData: {
  //               currency: 'VND',
  //               price: 7.5,
  //               discountedPrice: 7.5,
  //               formatted: {
  //                 price: '8₫',
  //                 discountedPrice: '8₫',
  //               },
  //             },
  //             weight: 0,
  //             sku: '366615376135191',
  //             visible: true,
  //           },
  //           stock: {
  //             trackQuantity: false,
  //             inStock: true,
  //           },
  //           _id: '00000000-0000-0000-0000-000000000000',
  //         },
  //       ],
  //       lastUpdated: '2024-10-03T16:28:03.192Z',
  //       ribbon: 'New',
  //       exportProductId: 'product_d99d3cc8-bc75-ec47-6c72-f713016f98f3',
  //       _id: 'd99d3cc8-bc75-ec47-6c72-f713016f98f3',
  //       _createdDate: '2014-12-11T08:55:49.958Z',
  //     },
  //     {
  //       name: "I'm a product",
  //       slug: 'i-m-a-product-6',
  //       visible: true,
  //       productType: 'physical',
  //       description:
  //         "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
  //       sku: '364215376135199',
  //       weight: 0,
  //       weightRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       stock: {
  //         trackInventory: false,
  //         inStock: true,
  //         inventoryStatus: 'IN_STOCK',
  //       },
  //       price: {
  //         currency: 'VND',
  //         price: 85,
  //         discountedPrice: 85,
  //         formatted: {
  //           price: '85₫',
  //           discountedPrice: '85₫',
  //         },
  //       },
  //       priceData: {
  //         currency: 'VND',
  //         price: 85,
  //         discountedPrice: 85,
  //         formatted: {
  //           price: '85₫',
  //           discountedPrice: '85₫',
  //         },
  //       },
  //       convertedPriceData: {
  //         currency: 'VND',
  //         price: 85,
  //         discountedPrice: 85,
  //         formatted: {
  //           price: '85₫',
  //           discountedPrice: '85₫',
  //         },
  //       },
  //       priceRange: {
  //         minValue: 85,
  //         maxValue: 85,
  //       },
  //       costRange: {
  //         minValue: 0,
  //         maxValue: 0,
  //       },
  //       additionalInfoSections: [
  //         {
  //           title: 'PRODUCT INFO',
  //           description:
  //             "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
  //         },
  //         {
  //           title: 'RETURN & REFUND POLICY',
  //           description:
  //             'I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.',
  //         },
  //         {
  //           title: 'SHIPPING INFO',
  //           description:
  //             "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
  //         },
  //       ],
  //       ribbons: [],
  //       media: {
  //         mainMedia: {
  //           thumbnail: {
  //             url: 'https://static.wixstatic.com/media/22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //             width: 50,
  //             height: 50,
  //           },
  //           mediaType: 'image',
  //           title: 'Cream-Context.jpg',
  //           image: {
  //             url: 'https://static.wixstatic.com/media/22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg',
  //             width: 4000,
  //             height: 4000,
  //           },
  //           _id: '22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg',
  //         },
  //         items: [
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Cream-Context.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg/v1/fit/w_4000,h_4000,q_90/file.jpg',
  //               width: 4000,
  //               height: 4000,
  //             },
  //             _id: '22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg',
  //           },
  //           {
  //             thumbnail: {
  //               url: 'https://static.wixstatic.com/media/22e53e_58f292496eec45eea41b21308739ae1c~mv2.jpg/v1/fit/w_50,h_50,q_90/file.jpg',
  //               width: 50,
  //               height: 50,
  //             },
  //             mediaType: 'image',
  //             title: 'Cream-Product.jpg',
  //             image: {
  //               url: 'https://static.wixstatic.com/media/22e53e_58f292496eec45eea41b21308739ae1c~mv2.jpg/v1/fit/w_3330,h_3329,q_90/file.jpg',
  //               width: 3330,
  //               height: 3329,
  //             },
  //             _id: '22e53e_58f292496eec45eea41b21308739ae1c~mv2.jpg',
  //           },
  //         ],
  //       },
  //       customTextFields: [],
  //       manageVariants: false,
  //       productOptions: [
  //         {
  //           optionType: 'drop_down',
  //           name: 'Size',
  //           choices: [
  //             {
  //               value: '80 ml',
  //               description: '80 ml',
  //               inStock: true,
  //               visible: true,
  //             },
  //             {
  //               value: '250 ml',
  //               description: '250 ml',
  //               inStock: true,
  //               visible: true,
  //             },
  //             {
  //               value: '500 ml',
  //               description: '500 ml',
  //               inStock: true,
  //               visible: true,
  //             },
  //           ],
  //         },
  //       ],
  //       productPageUrl: {
  //         base: 'https://201106362.wixsite.com/printify',
  //         path: '/product-page/i-m-a-product-6',
  //       },
  //       numericId: '1418288158573000',
  //       inventoryItemId: '15880dcf-aa70-a849-322e-f45a9a1707d8',
  //       discount: {
  //         type: 'NONE',
  //         value: 0,
  //       },
  //       collectionIds: [
  //         'd496e940-5a3c-e342-4836-8b39155c5eae',
  //         '00000000-000000-000000-000000000001',
  //       ],
  //       variants: [
  //         {
  //           choices: {},
  //           variant: {
  //             priceData: {
  //               currency: 'VND',
  //               price: 85,
  //               discountedPrice: 85,
  //               formatted: {
  //                 price: '85₫',
  //                 discountedPrice: '85₫',
  //               },
  //             },
  //             convertedPriceData: {
  //               currency: 'VND',
  //               price: 85,
  //               discountedPrice: 85,
  //               formatted: {
  //                 price: '85₫',
  //                 discountedPrice: '85₫',
  //               },
  //             },
  //             weight: 0,
  //             sku: '364215376135199',
  //             visible: true,
  //           },
  //           stock: {
  //             trackQuantity: false,
  //             inStock: true,
  //           },
  //           _id: '00000000-0000-0000-0000-000000000000',
  //         },
  //       ],
  //       lastUpdated: '2024-10-03T16:28:03.192Z',
  //       ribbon: '',
  //       exportProductId: 'product_ea77f230-558f-57b6-cdd1-0ba565e8f827',
  //       _id: 'ea77f230-558f-57b6-cdd1-0ba565e8f827',
  //       _createdDate: '2014-12-11T08:55:58.573Z',
  //     },
  //   ],
  // };
  const dataItems = [
    {
      _id: '612dabd6fa2eca0016d18377',
      prop: [
        {
          size: ['S', 'M', 'L', 'XL'],
          image: [
            'https://i.ibb.co/0VnWhNb/dri-fit-classic-basketball-jersey-g-Z1-Bk0.jpg',
            'https://i.ibb.co/ccbzTbg/nike-m-dry-classic-jersey.jpg',
          ],
        },
      ],
      name: 'Nike Dri-FIT Classic Basketball Jersey',
      slug: 'nike-dri-fit-classic-basketball-jersey',
      color: 'Black/Red',
      price: '759000',
      published_at: '2021-08-31T04:12:25.385Z',
      createdAt: '2021-08-31T04:11:02.194Z',
      updatedAt: '2021-08-31T04:12:25.938Z',
      __v: 0,
      category: {
        _id: '611908b3347c310cb83f11a1',
        name: 'Nike product',
        slug: 'nike-product',
        published_at: '2021-08-15T12:29:42.911Z',
        createdAt: '2021-08-15T12:29:39.985Z',
        updatedAt: '2021-08-15T12:29:43.069Z',
        __v: 0,
        id: '611908b3347c310cb83f11a1',
      },
      type: {
        _id: '611c521e9c72d22a449950e6',
        name: 'Jerseys and Kits',
        slug: 'jerseys-and-kits',
        published_at: '2021-08-18T00:19:45.044Z',
        createdAt: '2021-08-18T00:19:42.692Z',
        updatedAt: '2021-08-18T00:19:45.183Z',
        __v: 0,
        id: '611c521e9c72d22a449950e6',
      },
      id: '612dabd6fa2eca0016d18377',
    },
    {
      _id: '612dab85fa2eca0016d18376',
      prop: [
        {
          size: ['M', 'XL'],
          image: [
            'https://i.ibb.co/XV1X0sn/adidas-originals-Navy-London-Half-zip-Overhead-Jacket.jpg',
            'https://i.ibb.co/nfskcc8/adidas-originals-Navy-London-Half-zip-Overhead-Jacket-1.jpg',
          ],
        },
      ],
      name: 'Adidas London Half-zip Overhead Jacket',
      slug: 'adidas-london-half-zip-overhead-jacket',
      color: 'Navy/White',
      price: '1199000',
      published_at: '2021-08-31T04:09:48.175Z',
      createdAt: '2021-08-31T04:09:41.970Z',
      updatedAt: '2021-08-31T04:09:48.725Z',
      __v: 0,
      category: {
        _id: '611908bd347c310cb83f11a2',
        name: 'Adidas',
        slug: 'adidas',
        published_at: '2021-08-15T12:29:54.545Z',
        createdAt: '2021-08-15T12:29:49.830Z',
        updatedAt: '2021-08-15T12:29:54.657Z',
        __v: 0,
        id: '611908bd347c310cb83f11a2',
      },
      type: {
        _id: '61190955347c310cb83f11a8',
        name: 'Jacket and Hoodie',
        slug: 'jacket',
        published_at: '2021-08-15T12:32:24.145Z',
        createdAt: '2021-08-15T12:32:21.197Z',
        updatedAt: '2021-08-18T00:20:07.620Z',
        __v: 0,
        id: '61190955347c310cb83f11a8',
      },
      id: '612dab85fa2eca0016d18376',
    },
    {
      _id: '612daa8ffa2eca0016d18375',
      prop: [
        {
          size: ['42', '43'],
          image: [
            'https://i.ibb.co/YbJCVcy/5861d4b11ce77ca813ef9ab8750af226.jpg',
            'https://i.ibb.co/dsZY7Cj/adidas-zx-roots-running-exhibition-london-2-320x205.jpg',
          ],
        },
      ],
      name: 'Adidas zx4000 Retro',
      slug: 'adidas-zx4000-retro',
      color: 'White/Blue',
      price: '4999000',
      published_at: '2021-08-31T04:05:45.659Z',
      createdAt: '2021-08-31T04:05:35.300Z',
      updatedAt: '2021-08-31T04:05:46.210Z',
      __v: 0,
      category: {
        _id: '611908bd347c310cb83f11a2',
        name: 'Adidas',
        slug: 'adidas',
        published_at: '2021-08-15T12:29:54.545Z',
        createdAt: '2021-08-15T12:29:49.830Z',
        updatedAt: '2021-08-15T12:29:54.657Z',
        __v: 0,
        id: '611908bd347c310cb83f11a2',
      },
      type: {
        _id: '61190941347c310cb83f11a7',
        name: 'Shoes',
        slug: 'shoe',
        published_at: '2021-08-15T12:32:08.389Z',
        createdAt: '2021-08-15T12:32:01.465Z',
        updatedAt: '2021-08-15T12:32:08.519Z',
        __v: 0,
        id: '61190941347c310cb83f11a7',
      },
      id: '612daa8ffa2eca0016d18375',
    },
    {
      _id: '612da908fa2eca0016d18374',
      prop: [
        {
          size: ['40', '41', '42'],
          image: [
            'https://i.ibb.co/GC5ZDtZ/137294.jpg',
            'https://i.ibb.co/10Ldm9f/R-1.jpg',
          ],
        },
      ],
      name: 'Puma Infants Suede Pink Lady',
      slug: 'puma-infants-suede-pink-lady',
      color: 'Pink/White',
      price: '899000',
      published_at: '2021-08-31T03:59:10.204Z',
      createdAt: '2021-08-31T03:59:04.856Z',
      updatedAt: '2021-08-31T03:59:10.768Z',
      __v: 0,
      category: {
        _id: '611908db347c310cb83f11a4',
        name: 'Puma',
        slug: 'puma',
        published_at: '2021-08-15T12:30:22.387Z',
        createdAt: '2021-08-15T12:30:19.025Z',
        updatedAt: '2021-08-15T12:30:22.507Z',
        __v: 0,
        id: '611908db347c310cb83f11a4',
      },
      type: {
        _id: '61190941347c310cb83f11a7',
        name: 'Shoes',
        slug: 'shoe',
        published_at: '2021-08-15T12:32:08.389Z',
        createdAt: '2021-08-15T12:32:01.465Z',
        updatedAt: '2021-08-15T12:32:08.519Z',
        __v: 0,
        id: '61190941347c310cb83f11a7',
      },
      id: '612da908fa2eca0016d18374',
    },
    {
      _id: '612da85afa2eca0016d18373',
      prop: [
        {
          size: ['S', 'L', 'XL'],
          image: ['https://i.ibb.co/gtPQ70z/OIP-4.jpg'],
        },
      ],
      name: 'Converse Jacket With Baseball Collar',
      slug: 'converse-jacket-with-baseball-collar',
      color: 'Gray/Navy',
      price: '629000',
      published_at: '2021-08-31T03:56:16.379Z',
      createdAt: '2021-08-31T03:56:10.500Z',
      updatedAt: '2021-08-31T03:56:16.929Z',
      __v: 0,
      category: {
        _id: '611908cd347c310cb83f11a3',
        name: 'Converse',
        slug: 'converse',
        published_at: '2021-08-15T12:30:09.165Z',
        createdAt: '2021-08-15T12:30:05.955Z',
        updatedAt: '2021-08-15T12:30:09.568Z',
        __v: 0,
        id: '611908cd347c310cb83f11a3',
      },
      type: {
        _id: '61190955347c310cb83f11a8',
        name: 'Jacket and Hoodie',
        slug: 'jacket',
        published_at: '2021-08-15T12:32:24.145Z',
        createdAt: '2021-08-15T12:32:21.197Z',
        updatedAt: '2021-08-18T00:20:07.620Z',
        __v: 0,
        id: '61190955347c310cb83f11a8',
      },
      id: '612da85afa2eca0016d18373',
    },
    {
      _id: '612da558fa2eca0016d18372',
      prop: [
        {
          size: ['M', 'L', 'XL'],
          image: [
            'https://i.ibb.co/pwwxyg1/converse-blue-Core-Poly-Fill-Jacket-Mens-Jacket-In-Blue.jpg',
            'https://i.ibb.co/3h7HW2K/converse-blue-Core-Poly-Fill-Jacket-Mens-Jacket-In-Blue-1.jpg',
          ],
        },
      ],
      name: 'Converse Core Poly Fill Jacket',
      slug: 'converse-core-poly-fill-jacket',
      color: 'Black',
      price: '2399000',
      published_at: '2021-08-31T03:43:25.419Z',
      createdAt: '2021-08-31T03:43:20.213Z',
      updatedAt: '2021-08-31T03:43:25.972Z',
      __v: 0,
      category: {
        _id: '611908cd347c310cb83f11a3',
        name: 'Converse',
        slug: 'converse',
        published_at: '2021-08-15T12:30:09.165Z',
        createdAt: '2021-08-15T12:30:05.955Z',
        updatedAt: '2021-08-15T12:30:09.568Z',
        __v: 0,
        id: '611908cd347c310cb83f11a3',
      },
      type: {
        _id: '61190955347c310cb83f11a8',
        name: 'Jacket and Hoodie',
        slug: 'jacket',
        published_at: '2021-08-15T12:32:24.145Z',
        createdAt: '2021-08-15T12:32:21.197Z',
        updatedAt: '2021-08-18T00:20:07.620Z',
        __v: 0,
        id: '61190955347c310cb83f11a8',
      },
      id: '612da558fa2eca0016d18372',
    },
    {
      _id: '612da4b7fa2eca0016d18371',
      prop: [
        {
          size: [40, 41, 42],
          image: [
            'https://i.ibb.co/WxVtybN/1553480-165cf094-4df7-4e8f-a54b-c5a4d912cfa1-1364-1364.jpg',
            'https://i.ibb.co/C2jd5Nc/OIP-3.jpg',
          ],
        },
      ],
      name: 'Converse CDG Low Black',
      slug: 'converse-cdg-low-black',
      color: 'Black/Red',
      price: '1649000',
      published_at: '2021-08-31T03:40:44.382Z',
      createdAt: '2021-08-31T03:40:39.186Z',
      updatedAt: '2021-08-31T03:40:44.948Z',
      __v: 0,
      category: {
        _id: '611908cd347c310cb83f11a3',
        name: 'Converse',
        slug: 'converse',
        published_at: '2021-08-15T12:30:09.165Z',
        createdAt: '2021-08-15T12:30:05.955Z',
        updatedAt: '2021-08-15T12:30:09.568Z',
        __v: 0,
        id: '611908cd347c310cb83f11a3',
      },
      type: {
        _id: '61190941347c310cb83f11a7',
        name: 'Shoes',
        slug: 'shoe',
        published_at: '2021-08-15T12:32:08.389Z',
        createdAt: '2021-08-15T12:32:01.465Z',
        updatedAt: '2021-08-15T12:32:08.519Z',
        __v: 0,
        id: '61190941347c310cb83f11a7',
      },
      id: '612da4b7fa2eca0016d18371',
    },
    {
      _id: '612da423fa2eca0016d18370',
      prop: [
        {
          size: [39, 40, 41, 42],
          image: [
            'https://i.ibb.co/K2D1VbZ/OIP-1.jpg',
            'https://i.ibb.co/gV1BjWP/cdg.jpg',
          ],
        },
      ],
      name: 'Converse CDG White',
      slug: 'converse-cdg-white',
      color: 'White/Red',
      price: '1799000',
      published_at: '2021-08-31T03:38:20.543Z',
      createdAt: '2021-08-31T03:38:11.895Z',
      updatedAt: '2021-08-31T03:38:21.095Z',
      __v: 0,
      category: {
        _id: '611908cd347c310cb83f11a3',
        name: 'Converse',
        slug: 'converse',
        published_at: '2021-08-15T12:30:09.165Z',
        createdAt: '2021-08-15T12:30:05.955Z',
        updatedAt: '2021-08-15T12:30:09.568Z',
        __v: 0,
        id: '611908cd347c310cb83f11a3',
      },
      type: {
        _id: '61190941347c310cb83f11a7',
        name: 'Shoes',
        slug: 'shoe',
        published_at: '2021-08-15T12:32:08.389Z',
        createdAt: '2021-08-15T12:32:01.465Z',
        updatedAt: '2021-08-15T12:32:08.519Z',
        __v: 0,
        id: '61190941347c310cb83f11a7',
      },
      id: '612da423fa2eca0016d18370',
    },
    {
      _id: '612da319fa2eca0016d1836f',
      prop: [
        {
          size: ['UNI'],
          image: [
            'https://i.ibb.co/YRcwt2Z/OIP.jpg',
            'https://i.ibb.co/gwSYGcp/174831.jpg',
          ],
        },
      ],
      name: 'Nike Wristbands Navy',
      slug: 'nike-wristbands-navy',
      color: 'Navy/White',
      price: '149000',
      published_at: '2021-08-31T03:33:54.417Z',
      createdAt: '2021-08-31T03:33:45.254Z',
      updatedAt: '2021-08-31T03:33:54.967Z',
      __v: 0,
      category: {
        _id: '611908b3347c310cb83f11a1',
        name: 'Nike product',
        slug: 'nike-product',
        published_at: '2021-08-15T12:29:42.911Z',
        createdAt: '2021-08-15T12:29:39.985Z',
        updatedAt: '2021-08-15T12:29:43.069Z',
        __v: 0,
        id: '611908b3347c310cb83f11a1',
      },
      type: {
        _id: '611c52ce9c72d22a449950e7',
        name: 'Accessories',
        slug: 'accessories',
        published_at: '2021-08-18T00:22:40.276Z',
        createdAt: '2021-08-18T00:22:38.054Z',
        updatedAt: '2021-08-18T00:22:40.402Z',
        __v: 0,
        id: '611c52ce9c72d22a449950e7',
      },
      id: '612da319fa2eca0016d1836f',
    },
    {
      _id: '612da23bfa2eca0016d1836e',
      prop: [
        {
          size: [41, 42, 44],
          image: [
            'https://i.ibb.co/qxfYHg4/a4c94814c81010c5f956269526486fa3-crop-exact.jpg',
            'https://i.ibb.co/Lv3SvQs/Nike-Air-Jordan-2-Retro-Wing-It-06-coolsneakers.jpg',
          ],
        },
      ],
      name: 'Nike Air Jordan 2 Retro Wing It',
      slug: 'nike-air-jordan-2-retro-wing-it',
      color: 'White/Black',
      price: '6999000',
      published_at: '2021-08-31T03:30:12.003Z',
      createdAt: '2021-08-31T03:30:03.156Z',
      updatedAt: '2022-03-22T08:52:25.931Z',
      __v: 0,
      category: {
        _id: '611908b3347c310cb83f11a1',
        name: 'Nike product',
        slug: 'nike-product',
        published_at: '2021-08-15T12:29:42.911Z',
        createdAt: '2021-08-15T12:29:39.985Z',
        updatedAt: '2021-08-15T12:29:43.069Z',
        __v: 0,
        id: '611908b3347c310cb83f11a1',
      },
      type: {
        _id: '61190941347c310cb83f11a7',
        name: 'Shoes',
        slug: 'shoe',
        published_at: '2021-08-15T12:32:08.389Z',
        createdAt: '2021-08-15T12:32:01.465Z',
        updatedAt: '2021-08-15T12:32:08.519Z',
        __v: 0,
        id: '61190941347c310cb83f11a7',
      },
      id: '612da23bfa2eca0016d1836e',
    },
    {
      _id: '6128ffbf8ebb4b0016cf2eb0',
      prop: [
        {
          size: ['S', 'M', 'L'],
          image: [
            'https://i.ibb.co/sJX2Tj0/mt03203bk-nb-70-i.webp',
            'https://i.ibb.co/0QrFtGX/mt03203ecl-nb-40-i.webp',
          ],
        },
      ],
      name: 'NB Basic T-shirt',
      slug: 'nb-basic-t-shirt',
      color: 'Navy',
      price: '299000',
      published_at: '2021-08-27T15:07:49.471Z',
      createdAt: '2021-08-27T15:07:43.810Z',
      updatedAt: '2021-08-27T15:07:50.018Z',
      __v: 0,
      category: {
        _id: '611908f7347c310cb83f11a5',
        name: 'New balance',
        slug: 'new-balance',
        published_at: '2021-08-15T12:30:56.307Z',
        createdAt: '2021-08-15T12:30:47.924Z',
        updatedAt: '2021-08-15T12:30:56.466Z',
        __v: 0,
        id: '611908f7347c310cb83f11a5',
      },
      type: {
        _id: '6119095f347c310cb83f11a9',
        name: 'T-shirt',
        slug: 't-shirt',
        published_at: '2021-08-15T12:32:34.287Z',
        createdAt: '2021-08-15T12:32:31.956Z',
        updatedAt: '2021-08-15T12:32:34.397Z',
        __v: 0,
        id: '6119095f347c310cb83f11a9',
      },
      id: '6128ffbf8ebb4b0016cf2eb0',
    },
    {
      _id: '6128fe5d8ebb4b0016cf2eaf',
      prop: [
        {
          size: ['S', 'M', 'L', 'XL'],
          image: [
            'https://i.ibb.co/DMDvh5N/47c105c8-4ae1-41bf-9818-b902239fc085.webp',
            'https://i.ibb.co/Z1kSGJm/data-jpeg.webp',
          ],
        },
      ],
      name: 'England 2021 Jersey',
      slug: 'england-2021-jersey',
      color: 'White',
      price: '799000',
      published_at: '2021-08-27T15:01:58.345Z',
      createdAt: '2021-08-27T15:01:49.868Z',
      updatedAt: '2021-08-27T15:01:58.902Z',
      __v: 0,
      category: {
        _id: '611908b3347c310cb83f11a1',
        name: 'Nike product',
        slug: 'nike-product',
        published_at: '2021-08-15T12:29:42.911Z',
        createdAt: '2021-08-15T12:29:39.985Z',
        updatedAt: '2021-08-15T12:29:43.069Z',
        __v: 0,
        id: '611908b3347c310cb83f11a1',
      },
      type: {
        _id: '611c521e9c72d22a449950e6',
        name: 'Jerseys and Kits',
        slug: 'jerseys-and-kits',
        published_at: '2021-08-18T00:19:45.044Z',
        createdAt: '2021-08-18T00:19:42.692Z',
        updatedAt: '2021-08-18T00:19:45.183Z',
        __v: 0,
        id: '611c521e9c72d22a449950e6',
      },
      id: '6128fe5d8ebb4b0016cf2eaf',
    },
    {
      _id: '611c9809ce9f030016e2b11c',
      prop: [
        {
          size: ['S', 'M', 'XL'],
          image: [
            'https://i.ibb.co/THd21hk/14be5d24-c54a-4e3f-8dae-78585f0e44db-jpg.webp',
            'https://i.ibb.co/6smt1p1/3ec19b76-d669-4dcd-a25d-0979109c8f81-jpg.webp',
          ],
        },
      ],
      name: 'Adidas Trefoil Classic Cap Black',
      slug: 'adidas-trefoil-classic-cap-black',
      color: 'Black/White',
      price: '449000',
      published_at: '2021-08-18T05:19:43.746Z',
      createdAt: '2021-08-18T05:18:01.891Z',
      updatedAt: '2021-08-18T05:19:44.291Z',
      __v: 0,
      category: {
        _id: '611908bd347c310cb83f11a2',
        name: 'Adidas',
        slug: 'adidas',
        published_at: '2021-08-15T12:29:54.545Z',
        createdAt: '2021-08-15T12:29:49.830Z',
        updatedAt: '2021-08-15T12:29:54.657Z',
        __v: 0,
        id: '611908bd347c310cb83f11a2',
      },
      type: {
        _id: '61190984347c310cb83f11ab',
        name: 'Caps and Hats',
        slug: 'cap',
        published_at: '2021-08-15T12:33:11.160Z',
        createdAt: '2021-08-15T12:33:08.708Z',
        updatedAt: '2021-08-18T00:20:42.153Z',
        __v: 0,
        id: '61190984347c310cb83f11ab',
      },
      id: '611c9809ce9f030016e2b11c',
    },
    {
      _id: '611c94b8ce9f030016e2b11b',
      prop: [
        {
          size: [39, 40, 41, 42],
          image: [
            'https://i.ibb.co/jGk9NgZ/363699-01-1-removebg-preview-1.jpg',
            'https://i.ibb.co/X5x250X/363699-01-2-removebg-preview-1.jpg',
          ],
        },
      ],
      name: 'Puma Wmns Dare Black',
      slug: 'puma-wmns-dare-black',
      price: '1299000',
      color: 'Black/White',
      published_at: '2021-08-18T05:05:02.984Z',
      createdAt: '2021-08-18T05:03:52.796Z',
      updatedAt: '2021-08-18T05:15:17.458Z',
      __v: 0,
      category: {
        _id: '611908db347c310cb83f11a4',
        name: 'Puma',
        slug: 'puma',
        published_at: '2021-08-15T12:30:22.387Z',
        createdAt: '2021-08-15T12:30:19.025Z',
        updatedAt: '2021-08-15T12:30:22.507Z',
        __v: 0,
        id: '611908db347c310cb83f11a4',
      },
      type: {
        _id: '61190941347c310cb83f11a7',
        name: 'Shoes',
        slug: 'shoe',
        published_at: '2021-08-15T12:32:08.389Z',
        createdAt: '2021-08-15T12:32:01.465Z',
        updatedAt: '2021-08-15T12:32:08.519Z',
        __v: 0,
        id: '61190941347c310cb83f11a7',
      },
      id: '611c94b8ce9f030016e2b11b',
    },
    {
      _id: '611c4bcd9c72d22a449950e5',
      prop: [
        {
          size: [39, 40, 43, 44],
          image: [
            'https://i.ibb.co/tcqZQY8/OIP-2-removebg-preview.jpg',
            'https://i.ibb.co/wwH8w7h/t6a8580-4-removebg-preview.jpg',
          ],
        },
      ],
      name: 'Puma Mens Red Trainers',
      slug: 'puma-mens-red-trainers',
      color: 'Red/White',
      price: '949000',
      published_at: '2021-08-17T23:56:12.469Z',
      createdAt: '2021-08-17T23:52:45.773Z',
      updatedAt: '2021-08-18T05:24:47.632Z',
      __v: 0,
      category: {
        _id: '611908db347c310cb83f11a4',
        name: 'Puma',
        slug: 'puma',
        published_at: '2021-08-15T12:30:22.387Z',
        createdAt: '2021-08-15T12:30:19.025Z',
        updatedAt: '2021-08-15T12:30:22.507Z',
        __v: 0,
        id: '611908db347c310cb83f11a4',
      },
      type: {
        _id: '61190941347c310cb83f11a7',
        name: 'Shoes',
        slug: 'shoe',
        published_at: '2021-08-15T12:32:08.389Z',
        createdAt: '2021-08-15T12:32:01.465Z',
        updatedAt: '2021-08-15T12:32:08.519Z',
        __v: 0,
        id: '61190941347c310cb83f11a7',
      },
      id: '611c4bcd9c72d22a449950e5',
    },
    // {
    //   _id: '611a79e3666787300c2e1902',
    //   prop: [
    //     {
    //       size: ['M', 'L', 'XL'],
    //       image: ['https://i.ibb.co/2SkD2CK/nike-Padded-Down-Jacket.jpg'],
    //     },
    //   ],
    //   name: 'Nike Winter Jacket Black Men',
    //   slug: 'nike-winter-jacket-black-men',
    //   color: 'Black',
    //   price: '1199000',
    //   published_at: '2021-08-16T14:46:11.598Z',
    //   createdAt: '2021-08-16T14:44:51.880Z',
    //   updatedAt: '2021-08-16T14:46:11.710Z',
    //   __v: 0,
    //   category: {
    //     _id: '611908b3347c310cb83f11a1',
    //     name: 'Nike product',
    //     slug: 'nike-product',
    //     published_at: '2021-08-15T12:29:42.911Z',
    //     createdAt: '2021-08-15T12:29:39.985Z',
    //     updatedAt: '2021-08-15T12:29:43.069Z',
    //     __v: 0,
    //     id: '611908b3347c310cb83f11a1',
    //   },
    //   type: {
    //     _id: '61190955347c310cb83f11a8',
    //     name: 'Jacket and Hoodie',
    //     slug: 'jacket',
    //     published_at: '2021-08-15T12:32:24.145Z',
    //     createdAt: '2021-08-15T12:32:21.197Z',
    //     updatedAt: '2021-08-18T00:20:07.620Z',
    //     __v: 0,
    //     id: '61190955347c310cb83f11a8',
    //   },
    //   id: '611a79e3666787300c2e1902',
    // },
    // {
    //   _id: '611a740b666787300c2e1901',
    //   prop: [
    //     {
    //       size: [39, 40, 41, 42],
    //       image: [
    //         'https://i.ibb.co/f2TjY6M/159575-C-A-107-X1.jpg',
    //         'https://i.ibb.co/5jkPCdZ/13604756-1-black.jpg',
    //       ],
    //     },
    //   ],
    //   name: 'Converse High Chuck Taylor',
    //   slug: 'converse-high-chuck-taylor',
    //   color: 'Black/White',
    //   price: '749000',
    //   published_at: '2021-08-16T14:19:58.347Z',
    //   createdAt: '2021-08-16T14:19:55.713Z',
    //   updatedAt: '2021-08-16T14:19:58.468Z',
    //   __v: 0,
    //   category: {
    //     _id: '611908cd347c310cb83f11a3',
    //     name: 'Converse',
    //     slug: 'converse',
    //     published_at: '2021-08-15T12:30:09.165Z',
    //     createdAt: '2021-08-15T12:30:05.955Z',
    //     updatedAt: '2021-08-15T12:30:09.568Z',
    //     __v: 0,
    //     id: '611908cd347c310cb83f11a3',
    //   },
    //   type: {
    //     _id: '61190941347c310cb83f11a7',
    //     name: 'Shoes',
    //     slug: 'shoe',
    //     published_at: '2021-08-15T12:32:08.389Z',
    //     createdAt: '2021-08-15T12:32:01.465Z',
    //     updatedAt: '2021-08-15T12:32:08.519Z',
    //     __v: 0,
    //     id: '61190941347c310cb83f11a7',
    //   },
    //   id: '611a740b666787300c2e1901',
    // },
    // {
    //   _id: '611a710e666787300c2e1900',
    //   prop: [
    //     {
    //       size: [40, 41, 43],
    //       image: [
    //         'https://i.ibb.co/z28xGS6/R-1.jpg',
    //         'https://i.ibb.co/2ZkVjq7/OIP.jpg',
    //       ],
    //     },
    //   ],
    //   name: 'Air Jordan 1 Retro OG Satin Black Toe',
    //   slug: 'air-jordan-1-retro-og-satin-black-toe',
    //   price: '6999000',
    //   color: 'White/Black/Red',
    //   published_at: '2021-08-16T14:07:19.440Z',
    //   createdAt: '2021-08-16T14:07:10.510Z',
    //   updatedAt: '2021-08-16T14:49:01.582Z',
    //   __v: 0,
    //   category: {
    //     _id: '611908b3347c310cb83f11a1',
    //     name: 'Nike product',
    //     slug: 'nike-product',
    //     published_at: '2021-08-15T12:29:42.911Z',
    //     createdAt: '2021-08-15T12:29:39.985Z',
    //     updatedAt: '2021-08-15T12:29:43.069Z',
    //     __v: 0,
    //     id: '611908b3347c310cb83f11a1',
    //   },
    //   type: {
    //     _id: '61190941347c310cb83f11a7',
    //     name: 'Shoes',
    //     slug: 'shoe',
    //     published_at: '2021-08-15T12:32:08.389Z',
    //     createdAt: '2021-08-15T12:32:01.465Z',
    //     updatedAt: '2021-08-15T12:32:08.519Z',
    //     __v: 0,
    //     id: '61190941347c310cb83f11a7',
    //   },
    //   id: '611a710e666787300c2e1900',
    // },
    // {
    //   _id: '611a4d38666787300c2e18ff',
    //   prop: [
    //     {
    //       size: [40, 43, 44],
    //       image: [
    //         'https://i.ibb.co/ft6R5Rf/adidas-Ultraboost-DNA-x-LEGO-r-Plates-Shoes-White-FY7690.jpg',
    //         'https://i.ibb.co/g9FwRFd/adidas-Ultra-Boost-DNA-Lego-FY7690-release-date-raffle-list-6-600x600.jpg',
    //       ],
    //     },
    //   ],
    //   name: 'Adidas Ultraboost DNA x LEGO',
    //   slug: 'adidas-ultraboost-dna-x-lego',
    //   color: 'White/Yellow',
    //   price: '2199000',
    //   published_at: '2021-08-16T11:34:19.821Z',
    //   createdAt: '2021-08-16T11:34:16.949Z',
    //   updatedAt: '2021-08-16T11:34:19.951Z',
    //   __v: 0,
    //   category: {
    //     _id: '611908bd347c310cb83f11a2',
    //     name: 'Adidas',
    //     slug: 'adidas',
    //     published_at: '2021-08-15T12:29:54.545Z',
    //     createdAt: '2021-08-15T12:29:49.830Z',
    //     updatedAt: '2021-08-15T12:29:54.657Z',
    //     __v: 0,
    //     id: '611908bd347c310cb83f11a2',
    //   },
    //   type: {
    //     _id: '61190941347c310cb83f11a7',
    //     name: 'Shoes',
    //     slug: 'shoe',
    //     published_at: '2021-08-15T12:32:08.389Z',
    //     createdAt: '2021-08-15T12:32:01.465Z',
    //     updatedAt: '2021-08-15T12:32:08.519Z',
    //     __v: 0,
    //     id: '61190941347c310cb83f11a7',
    //   },
    //   id: '611a4d38666787300c2e18ff',
    // },
    // {
    //   _id: '61190d98cd0bde22e8960771',
    //   prop: [
    //     {
    //       size: [39, 40, 41, 42],
    //       image: [
    //         'https://i.ibb.co/5vBY1FM/Superstar-Shoes-Black-EG4959-01-standard.jpg',
    //         'https://i.ibb.co/C9fXhC1/OIP-1.jpg',
    //       ],
    //     },
    //   ],
    //   name: 'Adidas Superstar 20s',
    //   slug: 'adidas-superstar-20s',
    //   color: 'Black/White',
    //   price: '1249000',
    //   published_at: '2021-08-15T12:50:35.569Z',
    //   createdAt: '2021-08-15T12:50:32.330Z',
    //   updatedAt: '2021-08-17T23:49:55.279Z',
    //   __v: 0,
    //   category: {
    //     _id: '611908bd347c310cb83f11a2',
    //     name: 'Adidas',
    //     slug: 'adidas',
    //     published_at: '2021-08-15T12:29:54.545Z',
    //     createdAt: '2021-08-15T12:29:49.830Z',
    //     updatedAt: '2021-08-15T12:29:54.657Z',
    //     __v: 0,
    //     id: '611908bd347c310cb83f11a2',
    //   },
    //   type: {
    //     _id: '61190941347c310cb83f11a7',
    //     name: 'Shoes',
    //     slug: 'shoe',
    //     published_at: '2021-08-15T12:32:08.389Z',
    //     createdAt: '2021-08-15T12:32:01.465Z',
    //     updatedAt: '2021-08-15T12:32:08.519Z',
    //     __v: 0,
    //     id: '61190941347c310cb83f11a7',
    //   },
    //   id: '61190d98cd0bde22e8960771',
    // },
  ];
  const products = await productsService.getList({ $limit: 5, $skip: 0 });
  return (
    <div className="mt-12 grid gap-x-8 gap-y-16 justify-between grid-cols-5">
      {products?.data?.data.map((product: any) => (
        // <Link
        //   href={"/" + product.slug}
        //   className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        //   key={product._id}
        // >
        //   <div className="relative w-full h-80">
        //     <Image
        //       src={product.media?.mainMedia?.image?.url || "/product.png"}
        //       alt=""
        //       fill
        //       sizes="25vw"
        //       className="absolute object-cover rounded-2xl z-10 hover:opacity-0 transition-opacity easy duration-500"
        //     />
        //     {product.media?.items && (
        //       <Image
        //         src={product.media?.items[1]?.image?.url || "/product.png"}
        //         alt=""
        //         fill
        //         sizes="25vw"
        //         className="absolute object-cover rounded-2xl"
        //       />
        //     )}
        //   </div>
        //   <div className="flex justify-between">
        //     <span className="font-medium">{product.name}</span>
        //     <span className="font-semibold">${product.price?.price}</span>
        //   </div>
        //   {/* {product.additionalInfoSections && (
        //     <div
        //       className="text-sm text-gray-500"
        //       dangerouslySetInnerHTML={{
        //         __html: DOMPurify.sanitize(
        //           product.additionalInfoSections.find(
        //             (section: any) => section.title === "shortDesc"
        //           )?.description || ""
        //         ),
        //       }}
        //     ></div>
        //   )} */}
        //   <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
        //     Add to Cart
        //   </button>
        // </Link>
        <div key={product.id}>
          <ProductCard item={product} key={product.id} />
        </div>
      ))}
      {/* {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null} */}
    </div>
  );
};

export default ProductList;
