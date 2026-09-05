"""
Multi-Port Localhost Server for Pietro Zunino's Website Variations
Launches servers simultaneously:
  - http://localhost:8000  -> Master Variations Hub
  - http://localhost:8001  -> Version 1: Swiss Modernism & Editorial
  - http://localhost:8002  -> Version 2: The Classic Academic Scholar
  - http://localhost:8003  -> Version 3: High-Craft Tech & Terminal
  - http://localhost:8004  -> Version 4: Warm Nordic Editorial / Journal
"""

import http.server
import socketserver
import threading
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SERVERS = [
    {"port": 8000, "dir": BASE_DIR, "name": "Design Variations Hub"},
    {"port": 8001, "dir": os.path.join(BASE_DIR, "v1"), "name": "V1: Swiss Modernism"},
    {"port": 8002, "dir": os.path.join(BASE_DIR, "v2"), "name": "V2: Academic Scholar"},
    {"port": 8003, "dir": os.path.join(BASE_DIR, "v3"), "name": "V3: Tech Minimal"},
    {"port": 8004, "dir": os.path.join(BASE_DIR, "v4"), "name": "V4: Nordic Journal"},
]

def make_handler(target_dir):
    class CustomHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=target_dir, **kwargs)
        def translate_path(self, path):
            orig = super().translate_path(path)
            if not os.path.exists(orig):
                rel = os.path.relpath(orig, self.directory)
                base_fallback = os.path.join(BASE_DIR, rel)
                if os.path.exists(base_fallback):
                    return base_fallback
            return orig
        def log_message(self, format, *args):
            # Suppress request spam in console
            pass
    return CustomHandler

def run_server(server_info):
    port = server_info["port"]
    directory = server_info["dir"]
    handler = make_handler(directory)
    try:
        socketserver.TCPServer.allow_reuse_address = True
        with socketserver.TCPServer(("127.0.0.1", port), handler) as httpd:
            print(f"  [OK] http://localhost:{port}  -->  {server_info['name']}")
            httpd.serve_forever()
    except Exception as e:
        print(f"  [ERROR] Port {port}: {e}")

if __name__ == "__main__":
    print("\n========================================================")
    print("  Pietro Zunino -- Launching 4 Design Variations")
    print("========================================================\n")
    
    threads = []
    for s in SERVERS:
        t = threading.Thread(target=run_server, args=(s,), daemon=True)
        t.start()
        threads.append(t)
        
    print("\nAll 4 versions are now running live!")
    print("Press Ctrl+C to stop.\n")
    
    try:
        for t in threads:
            t.join()
    except KeyboardInterrupt:
        print("\nServers stopped.")
        sys.exit(0)
