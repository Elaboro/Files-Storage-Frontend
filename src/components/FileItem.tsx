import React, { FC } from "react";
import {
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  AiFillFileUnknown,
  AiOutlineClose,
  AiOutlineDownload
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi"
import { FileData } from "../api/type/type";

const FileItem: FC<{ file_data: FileData }> = ({
  file_data
}) => {
  return (
    <div>
      <Tooltip placement='top' label={`Owner: ${file_data.username}`} bg='blue.400'>
        <Card>
          <CardBody>
            <Flex>

              <Container>
                <Grid>
                  <GridItem>
                    <Center>
                      <AiFillFileUnknown size={70} />
                    </Center>
                  </GridItem>
                  <GridItem>
                    <Center>
                      <Text>{file_data.filename}</Text>
                    </Center>
                  </GridItem>
                </Grid>
              </Container>

              <Spacer />

              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<GiHamburgerMenu />}
                  variant='outline'
                />
                <MenuList>
                  <MenuItem icon={<AiOutlineDownload size={20} />}>
                    Скачать
                  </MenuItem>
                  <MenuItem icon={<AiOutlineClose size={20} />}>
                    Удалить
                  </MenuItem>
                </MenuList>
              </Menu>

            </Flex>
          </CardBody>
        </Card>
      </Tooltip>
    </div>
  );
};

export default FileItem;