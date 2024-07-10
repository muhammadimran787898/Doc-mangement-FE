"use client";

import axios from "axios";

import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useLayoutEffect } from "react";
import { getCookie } from "@/utils/cokies";

export default function Dashboard() {
  const fetchuser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/user/userdetail",
        {
          headers: {
            token: getCookie("authToken"),
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchuser();
  }, []);

  localStorage.getItem("authToken");

  return (
    <div className="h-full w-full">
      <div className="col-span-1 row-span-1 overflow-hidden">
        <main className="grid flex-1 items-start px-3 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>

                <CardFooter></CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
