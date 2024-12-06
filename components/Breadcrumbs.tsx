import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface breadcrumbItems {
  label: string;
  href?: string;
}

export default function Breadcrumbs({
  breadcrumbItems, className
}: {
  breadcrumbItems: breadcrumbItems[], className: "" | string
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          if (index === breadcrumbItems.length - 1) {
            return (
              <BreadcrumbPage key={index} className={className}>
                {item.label}
              </BreadcrumbPage>
            );
          }
          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={item.href} className={className}>
                {item.label}
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
