'use client';
import React, { useEffect, useState } from 'react';
// import CardSkeleton from "../../components/cardskeleton";
// import ProductCard from "../../components/productcard";
// import { useSelector } from "react-redux";
// import { recentCategory } from "../../slices/categorySlice";
import Head from 'next/head';
import Card from '@/components/Card';
import ProductCard from '@/components/ProductCard';
import productsService from '@/api/products';

export default function Home() {
  const data = [
    {
      _id: '611908b3347c310cb83f11a1',
      name: 'Nike product',
      slug: 'nike-product',
      published_at: '2021-08-15T12:29:42.911Z',
      createdAt: '2021-08-15T12:29:39.985Z',
      updatedAt: '2021-08-15T12:29:43.069Z',
      __v: 0,
      id: '611908b3347c310cb83f11a1',
    },
    {
      _id: '611908bd347c310cb83f11a2',
      name: 'Adidas',
      slug: 'adidas',
      published_at: '2021-08-15T12:29:54.545Z',
      createdAt: '2021-08-15T12:29:49.830Z',
      updatedAt: '2021-08-15T12:29:54.657Z',
      __v: 0,
      id: '611908bd347c310cb83f11a2',
    },
    {
      _id: '611908cd347c310cb83f11a3',
      name: 'Converse',
      slug: 'converse',
      published_at: '2021-08-15T12:30:09.165Z',
      createdAt: '2021-08-15T12:30:05.955Z',
      updatedAt: '2021-08-15T12:30:09.568Z',
      __v: 0,
      id: '611908cd347c310cb83f11a3',
    },
    {
      _id: '611908db347c310cb83f11a4',
      name: 'Puma',
      slug: 'puma',
      published_at: '2021-08-15T12:30:22.387Z',
      createdAt: '2021-08-15T12:30:19.025Z',
      updatedAt: '2021-08-15T12:30:22.507Z',
      __v: 0,
      id: '611908db347c310cb83f11a4',
    },
    {
      _id: '611908f7347c310cb83f11a5',
      name: 'New balance',
      slug: 'new-balance',
      published_at: '2021-08-15T12:30:56.307Z',
      createdAt: '2021-08-15T12:30:47.924Z',
      updatedAt: '2021-08-15T12:30:56.466Z',
      __v: 0,
      id: '611908f7347c310cb83f11a5',
    },
    {
      _id: '61190929347c310cb83f11a6',
      name: 'Mizuno',
      slug: 'mizuno',
      published_at: '2021-08-15T12:31:45.367Z',
      createdAt: '2021-08-15T12:31:37.940Z',
      updatedAt: '2021-08-15T12:31:45.494Z',
      __v: 0,
      id: '61190929347c310cb83f11a6',
    },
  ];
  const dataTypes = [
    {
      _id: '61190941347c310cb83f11a7',
      name: 'Shoes',
      slug: 'shoe',
      published_at: '2021-08-15T12:32:08.389Z',
      createdAt: '2021-08-15T12:32:01.465Z',
      updatedAt: '2021-08-15T12:32:08.519Z',
      __v: 0,
      id: '61190941347c310cb83f11a7',
    },
    {
      _id: '61190955347c310cb83f11a8',
      name: 'Jacket and Hoodie',
      slug: 'jacket',
      published_at: '2021-08-15T12:32:24.145Z',
      createdAt: '2021-08-15T12:32:21.197Z',
      updatedAt: '2021-08-18T00:20:07.620Z',
      __v: 0,
      id: '61190955347c310cb83f11a8',
    },
    {
      _id: '6119095f347c310cb83f11a9',
      name: 'T-shirt',
      slug: 't-shirt',
      published_at: '2021-08-15T12:32:34.287Z',
      createdAt: '2021-08-15T12:32:31.956Z',
      updatedAt: '2021-08-15T12:32:34.397Z',
      __v: 0,
      id: '6119095f347c310cb83f11a9',
    },
    {
      _id: '61190984347c310cb83f11ab',
      name: 'Caps and Hats',
      slug: 'cap',
      published_at: '2021-08-15T12:33:11.160Z',
      createdAt: '2021-08-15T12:33:08.708Z',
      updatedAt: '2021-08-18T00:20:42.153Z',
      __v: 0,
      id: '61190984347c310cb83f11ab',
    },
    {
      _id: '611c521e9c72d22a449950e6',
      name: 'Jerseys and Kits',
      slug: 'jerseys-and-kits',
      published_at: '2021-08-18T00:19:45.044Z',
      createdAt: '2021-08-18T00:19:42.692Z',
      updatedAt: '2021-08-18T00:19:45.183Z',
      __v: 0,
      id: '611c521e9c72d22a449950e6',
    },
    {
      _id: '611c52ce9c72d22a449950e7',
      name: 'Accessories',
      slug: 'accessories',
      published_at: '2021-08-18T00:22:40.276Z',
      createdAt: '2021-08-18T00:22:38.054Z',
      updatedAt: '2021-08-18T00:22:40.402Z',
      __v: 0,
      id: '611c52ce9c72d22a449950e7',
    },
  ];
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
    {
      _id: '611a79e3666787300c2e1902',
      prop: [
        {
          size: ['M', 'L', 'XL'],
          image: ['https://i.ibb.co/2SkD2CK/nike-Padded-Down-Jacket.jpg'],
        },
      ],
      name: 'Nike Winter Jacket Black Men',
      slug: 'nike-winter-jacket-black-men',
      color: 'Black',
      price: '1199000',
      published_at: '2021-08-16T14:46:11.598Z',
      createdAt: '2021-08-16T14:44:51.880Z',
      updatedAt: '2021-08-16T14:46:11.710Z',
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
        _id: '61190955347c310cb83f11a8',
        name: 'Jacket and Hoodie',
        slug: 'jacket',
        published_at: '2021-08-15T12:32:24.145Z',
        createdAt: '2021-08-15T12:32:21.197Z',
        updatedAt: '2021-08-18T00:20:07.620Z',
        __v: 0,
        id: '61190955347c310cb83f11a8',
      },
      id: '611a79e3666787300c2e1902',
    },
    {
      _id: '611a740b666787300c2e1901',
      prop: [
        {
          size: [39, 40, 41, 42],
          image: [
            'https://i.ibb.co/f2TjY6M/159575-C-A-107-X1.jpg',
            'https://i.ibb.co/5jkPCdZ/13604756-1-black.jpg',
          ],
        },
      ],
      name: 'Converse High Chuck Taylor',
      slug: 'converse-high-chuck-taylor',
      color: 'Black/White',
      price: '749000',
      published_at: '2021-08-16T14:19:58.347Z',
      createdAt: '2021-08-16T14:19:55.713Z',
      updatedAt: '2021-08-16T14:19:58.468Z',
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
      id: '611a740b666787300c2e1901',
    },
    {
      _id: '611a710e666787300c2e1900',
      prop: [
        {
          size: [40, 41, 43],
          image: [
            'https://i.ibb.co/z28xGS6/R-1.jpg',
            'https://i.ibb.co/2ZkVjq7/OIP.jpg',
          ],
        },
      ],
      name: 'Air Jordan 1 Retro OG Satin Black Toe',
      slug: 'air-jordan-1-retro-og-satin-black-toe',
      price: '6999000',
      color: 'White/Black/Red',
      published_at: '2021-08-16T14:07:19.440Z',
      createdAt: '2021-08-16T14:07:10.510Z',
      updatedAt: '2021-08-16T14:49:01.582Z',
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
      id: '611a710e666787300c2e1900',
    },
    {
      _id: '611a4d38666787300c2e18ff',
      prop: [
        {
          size: [40, 43, 44],
          image: [
            'https://i.ibb.co/ft6R5Rf/adidas-Ultraboost-DNA-x-LEGO-r-Plates-Shoes-White-FY7690.jpg',
            'https://i.ibb.co/g9FwRFd/adidas-Ultra-Boost-DNA-Lego-FY7690-release-date-raffle-list-6-600x600.jpg',
          ],
        },
      ],
      name: 'Adidas Ultraboost DNA x LEGO',
      slug: 'adidas-ultraboost-dna-x-lego',
      color: 'White/Yellow',
      price: '2199000',
      published_at: '2021-08-16T11:34:19.821Z',
      createdAt: '2021-08-16T11:34:16.949Z',
      updatedAt: '2021-08-16T11:34:19.951Z',
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
      id: '611a4d38666787300c2e18ff',
    },
    {
      _id: '61190d98cd0bde22e8960771',
      prop: [
        {
          size: [39, 40, 41, 42],
          image: [
            'https://i.ibb.co/5vBY1FM/Superstar-Shoes-Black-EG4959-01-standard.jpg',
            'https://i.ibb.co/C9fXhC1/OIP-1.jpg',
          ],
        },
      ],
      name: 'Adidas Superstar 20s',
      slug: 'adidas-superstar-20s',
      color: 'Black/White',
      price: '1249000',
      published_at: '2021-08-15T12:50:35.569Z',
      createdAt: '2021-08-15T12:50:32.330Z',
      updatedAt: '2021-08-17T23:49:55.279Z',
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
      id: '61190d98cd0bde22e8960771',
    },
  ];
  const [sort, setSort] = useState(0);
  const [products, setProducts] = useState([]);
  const recent_category = '';
  const data_items = dataItems.filter((item: any) => {
    if (recent_category.length > 0) {
      return item.type.name == recent_category;
    } else {
      return true;
    }
  });
  // .sort((a: any, b: any) => {
  //   if (sort === 1) {
  //     return a.price - b.price;
  //   }
  //   if (sort === 2) {
  //     return b.price - a.price;
  //   }
  //   return true;
  // });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    productsService.getList({}).then((res) => {
      setProducts(res?.data?.data);
    });
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      <Card categories={data} setSort={setSort} types={dataTypes}>
        {!loading ? (
          products?.length < 1 ? (
            <p className="col-span-full mx-auto text-sm text-gray-400">
              No item found
            </p>
          ) : (
            products?.map((item: any) => (
              <ProductCard key={item.slug} item={item} />
            ))
          )
        ) : (
          <>
            {/* <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton /> */}
          </>
        )}
      </Card>
    </>
  );
}
