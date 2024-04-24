"use client";
import { getResponses } from "@/app/api/response";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaChevronDown } from "react-icons/fa6";
import ResponseItem from "./ResponseItem";

export interface ReceivedResponse {
  dateId: string;
  date: Date;
  availableUsers: {
    userId: string;
    userName: string;
  }[];
}

const page = () => {
  const { data } = useQuery<ReceivedResponse[]>({
    queryKey: ["responses"],
    queryFn: getResponses,
  });

  return (
    <>
      <Box className="flex justify-between items-center mt-14 mr-10 w-11/12">
        <Typography>Aanwezigen</Typography>
        <Box className="flex justify-center items-center">
          <Button>
            <FaChevronDown />
            April
          </Button>
          <Button>
            <FaChevronDown />
            2024
          </Button>
        </Box>
      </Box>
      <Divider className="w-11/12 mt-2" />
      <Box className="mb-10">
        {data
          ?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((item) => (
            <ResponseItem
              key={item.dateId}
              dateId={item.dateId}
              date={item.date}
              availableUsers={item.availableUsers}
            />
          ))}
      </Box>
    </>
  );
};

export default page;
