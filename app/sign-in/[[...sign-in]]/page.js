
"use client"
import { SignIn } from "@clerk/clerk-react";
import { AppBar, Box, Button, Container, Toolbar, Typography, Link } from "@mui/material";


export default function SignInPage(){
    return (
        <Container maxWidth="100vh">
            <AppBar position = "static" sx={{backgroundColor:"#3f51b5"}}>
                <Toolbar>
                    <Typography variant="h6" sx={{
                        flexGrow:1
                    }}>FlashCard Sass</Typography>
                    <Button color="inherit">
                        <Link href="/sign-in" passHref>
                        Login
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up" passHref>
                        Signup
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <Box display="flex" 
            flexDirection="column" 
            alignItems="center"
            justifyContent="center">
                <Typography variant ="h4">Sign In</Typography>
                <SignIn />            
            </Box>
           
        </Container>
    )
}