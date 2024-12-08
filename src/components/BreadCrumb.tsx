import { ArrowRight, ChevronRight } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface Category {
  name: string;
  href: string;
}

const BreadcrumbComponent = ({ categories }: { categories: Category[] }) => {
  console.log(JSON.stringify(categories));
  return (
    <div className="py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">All Categories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {categories?.map((category: Category, index: number) => {
            const isLastItem = index === categories.length - 1;
            return (
              <React.Fragment key={category.href}>
                {category?.name && (
                  <BreadcrumbItem>
                    {isLastItem ? (
                      <span className="text-primary text-sm">
                        {category.name}
                      </span>
                    ) : (
                      <BreadcrumbLink
                        href={category.href}
                        className="text-primary hover:text-secondary hover:underline text-sm"
                      >
                        {category.name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbComponent;
