import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-center items-center">
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">
              Servers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href="https://www.gametracker.com/server_info/130.162.230.182:27015/"
              target="_blank"
            >
              <img
                src="https://cache.gametracker.com/server_info/130.162.230.182:27015/b_350_20_681212_280b0b_fef2f2_000000.png"
                width="350"
                height="20"
                alt="TTT server banner"
              />
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
