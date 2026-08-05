$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Start()
Write-Host 'Server running on http://localhost:8080/'

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($localPath)) {
            $localPath = 'index.html'
        }
        
        $filePath = Join-Path 'c:\Users\proye\Downloads\MY WEBSITE' $localPath
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            if ($filePath.EndsWith('.html')) {
                $response.ContentType = 'text/html; charset=utf-8'
            } elseif ($filePath.EndsWith('.css')) {
                $response.ContentType = 'text/css'
            } elseif ($filePath.EndsWith('.js')) {
                $response.ContentType = 'text/javascript'
            } elseif ($filePath.EndsWith('.png')) {
                $response.ContentType = 'image/png'
            } elseif ($filePath.EndsWith('.jpg') -or $filePath.EndsWith('.jpeg')) {
                $response.ContentType = 'image/jpeg'
            } elseif ($filePath.EndsWith('.svg')) {
                $response.ContentType = 'image/svg+xml'
            }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        $response.Close()
    } catch {
        # continue loop
    }
}
